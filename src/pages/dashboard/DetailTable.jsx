import { useState, useMemo, useEffect } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import "@/pages/dashboard/dashboard.css";

const DetailTable = ({ data, filters, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setCurrentPage(1);
  }, [data, filters]); 

  const filteredData = useMemo(() => {
    if (!filters?.isSearchClicked) return data;

    return data.filter(item => {
      const itemDate = item.time ? new Date(item.time) : null;

      const matchesFilters = [
        { selected: filters.department, field: item.partner_user_department },
        { selected: filters.job, field: item.partner_user_major },
        { selected: filters.position, field: item.partner_user_position },
        { selected: filters.workplace, field: item.location },
        { selected: filters.receivers, field: item.partner_user_name },
        { selected: filters.senders, field: item.from_partner_user_name }
      ].every(({ selected, field }) =>
        !selected?.length || selected.some(opt => opt.label === (field || 'Chưa xác định'))
      );

      const matchesDateRange =
        (!filters.startDate || (itemDate && itemDate >= filters.startDate)) &&
        (!filters.endDate || (itemDate && itemDate <= filters.endDate));

      return matchesFilters && matchesDateRange;
    });
  }, [data, filters]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredData]);

  const totalPages = useMemo(() => Math.ceil(filteredData.length / itemsPerPage), [filteredData]);

  return (
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
            {currentData.map((item, index) => (
              <TableRow key={item._id || index}>
                <TableCell>{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
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
        <button 
          className="btn-hide mt-4" 
          onClick={onClose}
        >
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
  );
};

export default DetailTable;
