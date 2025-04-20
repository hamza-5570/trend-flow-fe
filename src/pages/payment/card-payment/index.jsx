import Payment from "@/components/card-payment/payment";
import Summary from "@/components/card-payment/summary";
import { getUser } from "@/lib/helper";
import { useLazyGetuserByIdQuery } from "@/lib/services/auth-api";
import { useCreatePaymentMutation } from "@/lib/services/payment-api";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

export default function index() {
  const router = useRouter();
  const user = getUser();
  const [getuserById, { data, isLoading: userLoading }] =
    useLazyGetuserByIdQuery();
  const [creatingPaymenet, { isLoading }] = useCreatePaymentMutation();
  const stripe = useStripe();
  const elements = useElements();
  const handleSumbit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    try {
      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      const { error: stripeError, paymentMethod } =
        await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
        });

      if (stripeError) {
        if (stripeError.decline_code === "live_mode_test_card") {
          toast.error("Dummy card detected. Please use a real card", {
            theme: "colored",
          });
        }

        return;
      }
      const result = await creatingPaymenet({
        amount: 3000,
        currency: "usd",
        userId: user?._id,
        type: "monthly",
        paymentMethodId: paymentMethod.id,
      }).unwrap();

      if (result.success) {
        toast.success(result.message, {
          theme: "colored",
        });
        const userResponse = await getuserById(getUser()._id).unwrap();
        localStorage.setItem("user", JSON.stringify(userResponse.data));
        router.push("/dashboard");
      }
    } catch (error) {
      toast.error(error.message, {
        theme: "colored",
      });
      switch (error.decline_code) {
        case "expired_card":
          return toast.error(
            "Please double-check values or try a different card.",
            { theme: "colored" }
          );
        case "incorrect_cvc":
          return toast.error(error.message, { theme: "colored" });
        default:
          return toast.error(error.message, { theme: "colored" });
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <Payment handleSumbit={handleSumbit} isLoading={isLoading} />
      <Summary />
    </div>
  );
}
