"use client";

import { paypalCheckPayment } from "@/actions/payments/paypal-check-payment";
import { setTransactionId } from "@/actions/payments/setTransactionId";
import {
  PayPalButtons,
  PayPalButtonsComponentProps,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

interface Props {
  orderId: string;
  amount: string;
}

const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="animate-pulse mb-10">
        <div className="h-11 bg-gray-300 rounded mb-4"></div>
        <div className="h-11 bg-gray-300 rounded mt-4"></div>
      </div>
    );
  }

  const rountedAmount = Math.round(Number(amount) * 100) / 100;

  const createOrder: PayPalButtonsComponentProps["createOrder"] = async (
    data,
    actions
  ) => {
    try {
      const transactionId = await actions.order.create({
        intent: "CAPTURE",
        purchase_units: [
          {
            invoice_id: orderId,
            amount: {
              currency_code: "USD",
              value: `${rountedAmount}`,
            },
          },
        ],
      });

      const { ok } = await setTransactionId(transactionId, orderId);

      if (!ok) {
        throw new Error("No se pudo actualizar la orden");
      }

      return transactionId;
    } catch (error) {
      console.error("Error al crear la orden de PayPal:", error);
      throw error;
    }
  };

  const onApprove: PayPalButtonsComponentProps["onApprove"] = async (
    // onApprove: se dispar cuando se realiza el porceso con exito o de forma exitosa
    data,
    actions
  ) => {
    const details = await actions.order?.capture();
    if (!details) return;

    await paypalCheckPayment(details.id!);
  };

  return (
    <div className="relative z-0">
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />;
    </div>
  );
};

export default PaypalButton;
