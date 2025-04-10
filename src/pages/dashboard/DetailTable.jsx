import { useState, useMemo, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import "@/pages/dashboard/dashboard.css";
import axios from "axios";


const fetchData = async (token) => {
  try {
    const response = await axios.get("https://apitestchat.hasaki.vn/api/v1/user/getPendingMentionOfEmployeeV2", {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "vi",
        authorization: `Bearer ${token}`,
        // Không cần thêm "user-agent" vì trình duyệt sẽ tự động thiết lập header này
      }
    });
    return response.data; // Trả về dữ liệu từ API
  } catch (err) {
    console.error("API Error:", err);  // Log lỗi chi tiết để dễ dàng debug
    throw new Error(err.response?.data?.message || "Token không hợp lệ hoặc xảy ra lỗi khi kết nối API");
  }
};



const DetailTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const itemsPerPage = 20;
  // Sử dụng useMemo để tính toán lại dữ liệu mỗi khi currentPage hoặc data thay đổi
  const currentData = useMemo(() => {
    if (Array.isArray(data)) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      return data.slice(startIndex, startIndex + itemsPerPage);
    }
    return []; // Nếu data không phải là mảng, trả về mảng rỗng
  }, [currentPage, data]);
  

  // Tính tổng số trang mỗi khi dữ liệu thay đổi
  const totalPages = useMemo(() => Math.ceil(data.length / itemsPerPage), [data]);

  const handleFetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoxLCJwYXJ0bmVyX3VzZXJfaWQiOiI2IiwibWFqb3JfaWQiOjE0MiwibmFtZSI6IsSQaW5oIEjDsmEgSGnhu4dwIiwiaWF0IjoxNzQ0MjcxNDM2fQ.OhPNolInHY3AgI8_S4xqszs4T1ifRJKw8vB2XyC-TYs"; 
      const result = await fetchData(token);
  
      console.log("Dữ liệu trả về từ API:", result);
  
      // Kiểm tra và lấy mảng
      if (result && result.data && Array.isArray(result.data.list)) {
        setData(result.data.list);  // Lưu mảng 'list' 
      } else {
        throw new Error("Dữ liệu trả về không có mảng trong thuộc tính 'list'");
      }
  
      setShowTable(true);
    } catch (err) {
      console.error("Error occurred:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="detail-container">
      {!showTable && !loading && !error && (
        <div className="button-container">
          <button onClick={handleFetchData} className="btn-xct">
            Xem chi tiết
          </button>
        </div>
      )}

      {loading && (
        <div className="loading-container">
          <p>Đang tải dữ liệu...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="text-red-500">{error}</p>
          <button onClick={handleFetchData} className="btn-xct mt-2">
            Thử lại
          </button>
        </div>
      )}

      {showTable && !loading && !error && (
        <div className="table-hide">
          <div className="table-container overflow-y-auto">
          <Table>
  <TableHead className="sticky top-0 bg-white z-10">
    <TableRow className="tr-table">
      <TableCell className="text-center">#</TableCell>
      <TableCell className="text-center">Mã NV</TableCell>
      <TableCell className="text-center">Họ tên</TableCell>
      <TableCell className="text-center">Bộ phận</TableCell>
      <TableCell className="text-center">Vị trí</TableCell>
      <TableCell className="text-center">Nghiệp vụ</TableCell>
      <TableCell className="text-center">Nhóm chat</TableCell>
      <TableCell className="text-center">Nội dung tin nhắn</TableCell>
      <TableCell className="text-center">Tên người gửi</TableCell>
      <TableCell className="text-center">Ngày gửi</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((item, index) => (
      <TableRow key={item._id || index}>
        <TableCell>{index + 1}</TableCell> 
        <TableCell>{item.partner_user_code}</TableCell> 
        <TableCell>{item.partner_user_name}</TableCell> 
        <TableCell>{item.partner_user_department}</TableCell> 
        <TableCell>{item.partner_user_position}</TableCell> 
        <TableCell>{item.partner_user_major}</TableCell> 
        <TableCell>{item.room_name}</TableCell> 
        <TableCell>{item.parsed_text}</TableCell> 
        <TableCell>
  {item.from_partner_user_name}<br />
  {item.from_partner_user_email}
</TableCell>

        <TableCell>{new Date(item.time).toLocaleString()}</TableCell> 
      </TableRow>
    ))}
  </TableBody>
</Table>

          </div>

          
          <div className="controls">
            <button onClick={() => setShowTable(false)} className="btn-hide">
              Ẩn chi tiết
            </button>
            <div className="pagination">
              <button 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                disabled={currentPage === 1}
                className="btn-pagination"
              >
                &laquo;
              </button>
              <span className="page-info">{currentPage} / {totalPages}</span>
              <button 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                disabled={currentPage === totalPages}
                className="btn-pagination"
              >
                &raquo;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailTable;
