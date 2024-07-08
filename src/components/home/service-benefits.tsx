import {
  Truck,
  PhoneOutgoing,
  CircleDollarSign,
  ShieldBan,
} from "lucide-react";
import MaxWidthWrapper from "../max-width-wrapper";

const ServiceBenefits = () => {
  return (
    <MaxWidthWrapper>
      <section className="pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-5 flex items-center justify-start sm:justify-center gap-2">
            <div className="p-4 flex flex-col items-center gap-6 border rounded-full group">
              <Truck
                strokeWidth={1.5}
                size={24}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
            </div>
            <div className="">
              <p className="text-base font-bold">Miễn phí vận chuyển</p>
              <span className="text-sm text-muted-foreground text-nowrap">
                Phạm vi trên toàn quốc
              </span>
            </div>
          </div>
          <div className="p-5 flex items-center justify-start sm:justify-center gap-2">
            <div className="p-4 flex flex-col items-center gap-6 border rounded-full group">
              <PhoneOutgoing
                strokeWidth={1.5}
                size={24}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
            </div>
            <div className="">
              <p className="text-base font-bold">Sẵn sàng hỗ trợ</p>
              <span className="text-sm text-muted-foreground text-nowrap">
                Hãy liên hệ với chúng tôi
              </span>
            </div>
          </div>
          <div className="p-5 flex items-center justify-start sm:justify-center gap-2">
            <div className="p-4 flex flex-col items-center gap-6 border rounded-full group">
              <ShieldBan
                strokeWidth={1.5}
                size={24}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
            </div>
            <div className="">
              <p className="text-base font-bold">An toàn thanh toán</p>
              <span className="text-sm text-muted-foreground text-nowrap">
                Cổng thanh toán uy tín
              </span>
            </div>
          </div>
          <div className="p-5 flex items-center justify-start sm:justify-center gap-2">
            <div className="p-4 flex flex-col items-center gap-6 border rounded-full group">
              <CircleDollarSign
                strokeWidth={1.5}
                size={24}
                className="group-hover:[transform:rotateY(360deg)] transition-all duration-1000"
              />
            </div>
            <div className="">
              <p className="text-base font-bold">Giá rẻ bật nhất</p>
              <span className="text-sm text-muted-foreground text-nowrap">
                Siêu tiết kiệm & miễn phí giao hàng
              </span>
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default ServiceBenefits;
