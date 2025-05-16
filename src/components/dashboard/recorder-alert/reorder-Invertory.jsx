import { Form, Formik } from "formik";
import ReorderForm from "./reorder-form";
import {  useUpdateInventoryStockMutation } from "@/lib/services/alerts-api";
import { toast } from "sonner";
import { useGetInventoryQuery } from "@/lib/services/auth-api";

export default function ReorderInvertory() {
  const [updateInventoryStock,{isLoading}] = useUpdateInventoryStockMutation();
    const {data,isLoading:loading,refetch}=useGetInventoryQuery()

  const handleSubmit = async (values,{resetForm}) => {
    const formdata = new FormData();
    formdata.append("file", values.file);
    formdata.append("lead_time", values.lead_time);
    formdata.append("safety_stock", values.safety_stock);
    await updateInventoryStock(formdata).unwrap().then((res) => {
      toast.success(res?.message);
      resetForm()
      refetch()
    }).catch((err) => {
      toast.error(err?.data?.error);
    });
  };
  return (
    <Formik
      initialValues={{
        lead_time: data?.message?.inventory[0]?.lead_time,
        safety_stock: data?.message?.inventory[0]?.safety_stock,
        file: null,
      }}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(props) => (
        <Form className="w-[90%]" onSubmit={props.handleSubmit}>
          <ReorderForm refetch={refetch} isloading={isLoading} />
        </Form>
      )}
    </Formik>
  );
}
