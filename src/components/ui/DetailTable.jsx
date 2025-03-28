import { useState } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody,} from "@/components/ui/table";
import "@/pages/dashboard/dashboard.css";

const DetailTable = () => {
    const [showTable, setShowTable] = useState(false);
  
    return (
      <div>
        {/*hiển thị Xem chi tiết*/}
        {!showTable && (
            <div className="button-container">
          <button 
            onClick={() => setShowTable(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            Xem chi tiết
          </button>
          </div>
        )}
  
        {/*Hiển thị bảng*/}
        {showTable && (
          <div className="table-container">
            <Table>
              <TableHead>
                <TableRow className="bg-green-100">
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
                <TableRow>
                  <TableCell>Nguyễn Văn A</TableCell>
                  <TableCell>IT</TableCell>
                  <TableCell>Developer</TableCell>
                  <TableCell>Code</TableCell>
                  <TableCell>Chat Group 1</TableCell>
                  <TableCell>Xin chào</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>2025-03-28</TableCell>
                </TableRow>
              </TableBody>
            </Table>
  
            {/*Ẩn chi tiết*/}
            <div className="hide-button">
            <button 
              onClick={() => setShowTable(false)} 
              className="bg-red-500"
            >
              Ẩn chi tiết
            </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default DetailTable;