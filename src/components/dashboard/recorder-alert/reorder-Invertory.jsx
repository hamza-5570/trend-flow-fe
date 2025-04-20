import { Form, Formik } from "formik";
import ReorderForm from "./reorder-form";
import {  useUpdateInventoryStockMutation } from "@/lib/services/alerts-api";
import { toast } from "sonner";

export default function ReorderInvertory() {
  const [updateInventoryStock,{isLoading}] = useUpdateInventoryStockMutation();
  const handleSubmit = async (values,{resetForm}) => {
    const formdata = new FormData();
    formdata.append("file", values.file);
    formdata.append("lead_time", values.lead_time);
    formdata.append("safety_stock", values.safety_stock);
    await updateInventoryStock(formdata).unwrap().then((res) => {
      toast.success(res?.message);
      resetForm()
    }).catch((err) => {
      toast.error(err?.data?.error);
    });
  };

  return (
    <Formik
      initialValues={{
        lead_time: "",
        safety_stock: "",
        file: null,
      }}
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="w-[90%]" onSubmit={props.handleSubmit}>
          <ReorderForm isloading={isLoading} />
        </Form>
      )}
    </Formik>
  );
}
