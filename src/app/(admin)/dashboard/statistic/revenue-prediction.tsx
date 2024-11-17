import {
  orderPredict,
  revenuePredict,
} from "~/modules/AI/services/OrderPredictionService";
import { useEffect, useState } from "react";
import { ButtonDownloadCSV } from "~/modules/admin/components/btn-download-csv";
import { RevenueDataPrediction } from "~/modules/AI/models/RevenueDataPrediction";
import { RevenuePredictionChart } from "~/modules/admin/components/revenue-prediction-chart";

export function RevenuePrediction() {
  const [data, setData] = useState<RevenueDataPrediction | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await revenuePredict();
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4 w-full bg-white rounded-md shadow-lg">
      <div className="flex justify-between items-center gap-4">
        <h3 className="font-bold text-xl">Dự báo doanh thu</h3>

        <ButtonDownloadCSV endpoint={"export-csv-revenue-stats"} />
      </div>

      <RevenuePredictionChart data={data} />

      {/* customize leged */}
      <div className="flex justify-center">
        <div className="flex space-x-4 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-[#8104fd] relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-white border-2 border-[#8104fd] rounded-full "></span>
            </div>
            <p>Doanh thu thực tế</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-6 h-0.5 bg-[#00aaff] relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-3 bg-white border-2 border-[#00aaff] rounded-full "></span>
            </div>
            <p>Doanh thu dự kiến</p>
          </div>
        </div>
      </div>
    </div>
  );
}
