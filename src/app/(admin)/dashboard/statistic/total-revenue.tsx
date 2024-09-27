import { memo, useEffect, useState } from "react";

const TotalRevenue = () => {
  const [dataAxis, setDataAxis] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   setDataAxis(Object.keys(result.payload.data));
    //   setData(Object.values(result.payload.data));
    // };
    // fetchData();
  }, []);

  return (
    <div className="p-4 bg-white rounded-md shadow-lg">
      {/* <h3 className="text-xl font-bold">Tổng doanh thu</h3> */}
    </div>
  );
};

export default memo(TotalRevenue);
