import { useState, useMemo } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import "@/pages/dashboard/dashboard.css";

// Giả lập dữ liệu
const generateData = () => {
  return Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    employeeCode: `NV${i + 1}`,
    name: `Nguyễn Văn ${String.fromCharCode(65 + (i % 26))}`,
    department: "IT",
    position: "Developer",
    task: "Code",
    chatGroup: `Chat Group ${i % 5 + 1}`,
    message: "Xin chào",
    sender: "Admin",
    date: "2025-03-28",
  }));
};

const DetailTable = () => {
  const [showTable, setShowTable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const data = useMemo(() => generateData(), []);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Dữ liệu hiển thị theo trang
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, data]);

  return (
    <div className="detail-container">
      {!showTable ? (
        <div className="button-container">
          <button onClick={() => setShowTable(true)} className="btn-xct">
            Xem chi tiết
          </button>
        </div>
      ) : (
        <div className="table-hide">
          <div className="table-container overflow-y-auto ">
            <Table>
              <TableHead className="sticky top-0 bg-white z-10">
                <TableRow className="tr-table">
                  <TableCell>#</TableCell>
                  <TableCell>Mã NV</TableCell>
                  <TableCell>Họ tên</TableCell>
                  <TableCell>Bộ phận</TableCell>
                  <TableCell>Vị trí</TableCell>
                  <TableCell>Nghiệp vụ</TableCell>
                  <TableCell>Nhóm chat</TableCell>
                  <TableCell>Nội dung tin nhắn</TableCell>
                  <TableCell>Tên người gửi</TableCell>
                  <TableCell>Ngày gửi</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentData.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                    <TableCell>{item.employeeCode}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>{item.position}</TableCell>
                    <TableCell>{item.task}</TableCell>
                    <TableCell>{item.chatGroup}</TableCell>
                    <TableCell>{item.message}</TableCell>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Nút điều khiển */}
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
