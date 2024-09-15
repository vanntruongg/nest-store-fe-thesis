import type { Metadata } from "next";
import { ReactNode } from "react";

import Header from "~/common/components/header";
import Footer from "~/common/components/footer";
import CartProvider from "../cart-provider";
import CheckoutProvider from "../checkout-provider";

export const metadata: Metadata = {
  title: "NEST Store - Cửa hàng thời trang",
  description:
    "Mua sắm trực tuyến hàng triệu sản phẩm thời trang theo xu hướng mới nhất và like new. Giá tốt &amp; Miễn phí vận chuyển. Mua và bán online trong 30 giây. Mã giảm giá | NEST Store Đảm Bảo",
};

export default function GuestLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex justify-center">
        <Header />
      </div>
      <CartProvider>
        <CheckoutProvider>
          <div className="flex-grow flex-1 mt-[76px] ">{children}</div>
        </CheckoutProvider>
      </CartProvider>
      <Footer />
    </main>
  );
}
