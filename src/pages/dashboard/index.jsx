import React, { useState } from "react";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Search, RefreshCcw } from "lucide-react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DetailTable from "./DetailTable";
import "./dashboard.css";



export default function DashBoard() {
  const [department, setDepartment] = useState(null);
  const [job, setJob] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [position, setPosition] = useState(null);
  const [workplace, setWorkplace] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);

  const CustomOption = (props) => {
    return (
      <components.Option {...props}>
        {props.data.label}
      </components.Option>
    );
  };
  const customStyles = {
    option: (provided, { isSelected }) => ({
      ...provided,
      fontWeight: isSelected ? "bold" : "normal",
      backgroundColor: isSelected ? "#f0f0f0" : "white",
      color: isSelected ? "white" : "black",
      ":hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
    control: (provided) => ({
      ...provided,
      maxHeight: "40px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      maxHeight: "32px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    input: (provided) => ({
      ...provided,
    position: "relative",
    zIndex: 2, // Đặt input trên placeholder
    }),
    placeholder: (provided) => ({
      ...provided,
      position: "absolute",
      top: "56%",
      transform: "translateY(-50%)",
      zIndex: 1, // Đặt placeholder dưới input
      pointerEvents: "none", // Tránh chặn click
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#a1a1a1", 
      cursor: "pointer",
      ":hover": {
        color: "#616060",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#f0f0f0",
      color: "white",
      whiteSpace: "nowrap",
    }),
  };
  
  
  
  const departmentOptions = [
    { value: "KAIZEN", label: "KAIZEN" },
    { value: "LOGISTICS", label: "LOGISTICS" },
    { value: "SUPPLY CHAIN", label: "SUPPLY CHAIN" },
    { value: "ADM", label: "ADM" },
    { value: "F&A", label: "F&A" },
    { value: "BOD", label: "BOD" },
    { value: "CLINIC", label: "CLINIC" },
    { value: "TECH", label: "TECH" }
  ];
  
  
  
  
  const jobOptions = [
    { value: "CSKH", label: "CSKH" },
    { value: "Cosmetic", label: "Cosmetic" },
    { value: "Đào tạo", label: "Đào tạo" },
    { value: "Quản lý cửa hàng", label: "Quản lý cửa hàng" },
    { value: "Bảo vệ", label: "Bảo vệ" },
    { value: "Đóng gói", label: "Đóng gói" },
    { value: "Tư vấn Clinic", label: "Tư vấn Clinic" },
    { value: "BOM", label: "BOM" },
    { value: "Giao hàng nhanh", label: "Giao hàng nhanh" }
  ];
  const data = [
    { id: 1, department: "LOGISTICS", count: 3177, service: "Giao hàng nhanh" },
    { id: 2, department: "TECH", count: 9, service: "CSKH Cosmetic" },
    { id: 3, department: "SPA", count: 3, service: "Bác sĩ" },
    { id: 4, department: "SPA", count: 1, service: "CSKH Spa" },
    { id: 5, department: "LOGISTICS", count: 3177, service: "Giao hàng nhanh" },
    { id: 6, department: "TECH", count: 9, service: "CSKH Cosmetic" },
    { id: 7, department: "SPA", count: 3, service: "Bác sĩ" },
    { id: 8, department: "SPA", count: 1, service: "CSKH Spa" }
  ];
  const positionOptions = [
    { value: "Specialist", label: "Specialist" },
    { value: "Assistant Supervisor", label: "Assistant Supervisor" },
    { value: "Sub Leader", label: "Sub Leader" },
    { value: "Supervisor", label: "Supervisor" },
    { value: "Assistant Manager", label: "Assistant Manager" },
    { value: "Director", label: "Director" },
    { value: "Doctor", label: "Doctor" },
    { value: "Manager", label: "Manager" }
  ];
  const workplaceOptions = [
    { value: "123 an khánh", label: "123 An Khánh" },
    { value: "234 bình thủy", label: "234 Bình Thủy" },
    { value: "456 cái răng", label: "456 Cái Răng" },
    { value: "789 thốt nốt", label: "789 Thốt Nốt" },
    { value: "999 cờ đỏ", label: "999 Cờ Đỏ" }
  ];
 
  
  const details = {
    1: ["Nguyễn Văn A - 20", "Trần Thị B - 15"],
    2: ["Phạm Văn C - 10"],
    3: ["Lê Thị D - 5"],
    4: ["Hoàng Văn E - 2"],
  };
  const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
    return (
      <div className="date-picker-container">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Từ ngày"
          className="custom-datepicker"
        />
        <span> → </span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          dateFormat="dd/MM/yyyy"
          placeholderText="Đến ngày"
          className="custom-datepicker"
        />
      </div>
    );
  };
  const employees = [
    { id: 1, name: "Nguyễn Thị Luyện", department: "COSMETICS", location: "176 Phan Đăng Lưu", count: 27 },
    { id: 2, name: "Mai Yến Nhi", department: "COSMETICS", location: "447 Phan Văn Trị", count: 22 },
    { id: 3, name: "BOD Test 1", department: "BOD", location: "", count: 15 },
    { id: 4, name: "Nguyễn Văn Tính", department: "COSMETICS", location: "555 3 tháng 2", count: 10 },
    { id: 5, name: "Nguyễn Thị Luyện", department: "COSMETICS", location: "176 Phan Đăng Lưu", count: 27 },
    { id: 6, name: "Mai Yến Nhi", department: "COSMETICS", location: "447 Phan Văn Trị", count: 22 },
    { id: 7, name: "BOD Test 1", department: "BOD", location: "", count: 15 },
    { id: 8, name: "Nguyễn Văn Tính", department: "COSMETICS", location: "555 3 tháng 2", count: 10 },
];
  return (
    <section className="p-6 text-white">
      <div className="form-container w-full h-full p-4">
        <div className="grid-container grid-cols-6 gap-4 items-center mb-4 w-full">
          <div className="col-span-2 flex w-full">
            <div className="button-group flex gap-2 w-full">
              <Button className="btn-search btn">
                <Search size={14} />
              </Button>
              <Button className="btn-ref btn">
                <RefreshCcw size={14} />
              </Button>
              <Button className="btn-excel btn">Xuất Excel</Button>
            </div>
          </div>

          <div className="grid-rows-2 grid gap-4">
  <div className="grid grid-cols-4 gap-3">
    <div className="input-wrapper"><Input placeholder="Người nhận" className="w-full" /></div>
    <div className="input-wrapper"><Input placeholder="Người gửi" className="w-full" /></div>
    <div className="datepicker-Day">
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    selectsStart
    startDate={startDate}
    endDate={endDate}
    dateFormat="dd/MM/yyyy"
    placeholderText="Từ ngày"
    className="datepicker border"
  />
  
  <span>→</span>

  <DatePicker
    selected={endDate}
    onChange={(date) => setEndDate(date)}
    selectsEnd
    startDate={startDate}
    endDate={endDate}
    minDate={startDate}
    dateFormat="dd/MM/yyyy"
    placeholderText="Đến ngày"
    className="datepicker border"
  />
</div>

  </div>

  <div className="filter-container grid grid-cols-4 gap-4">
  <div className="filter-item">
  <Select
  className="w-full"
  options={departmentOptions}
  value={department}
  onChange={setDepartment}
  placeholder="Bộ phận"
  isMulti
  closeMenuOnSelect={false}
  components={{ Option: CustomOption }}
  styles={customStyles}
/>

  </div>

  <div className="filter-item">
  <Select
  className="w-full custom-select"
  options={jobOptions}
  value={job}
  onChange={setJob}
  placeholder="Nghiệp vụ"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
/>

  </div>

  <div className="filter-item">
  <Select
  className="w-full custom-select"
  options={positionOptions}
  value={position}
  onChange={setPosition}
  placeholder="Vị trí"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
/>

</div>

<div className="filter-item">
<Select
  className="w-full custom-select"
  options={workplaceOptions}
  value={workplace}
  onChange={setWorkplace}
  placeholder="Nơi làm việc"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
/>



</div>
</div>

</div>

        </div>
      </div>

      <Card>
      <CardContent>
  <div className="content-wrapper">
  <div className="pending-tasks-summary" >
    <h3 className="text-lg mb-4">Số lượng chờ xử lý theo bộ phận/nghiệp vụ</h3>
    <h3 className="text-lg mb-4">Tổng: </h3>
    </div>
    <div className="tables-wrapper">
      {/* Bảng bộ phận */}
      <div className="table">
        <Table>
          <TableHead  className=" tr-table">
            <TableRow >
              <TableCell>Bộ phận</TableCell>
              <TableCell>Số lượng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setSelectedRow(selectedRow === row.id ? null : row.id)}
              >
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="table">
      <Table>
  <TableHead>
    <TableRow className="tr-table">
      <TableCell>Nghiệp vụ</TableCell>
      <TableCell>Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {data.map((row) => (
      <TableRow
        key={row.id}
        onClick={() => setSelectedRow(selectedRow === row.id ? null : row.id)}
      >
        <TableCell>{row.service}</TableCell>
        <TableCell>{row.count}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

      </div>
      <div className="table">
      <Table>
  <TableHead>
    <TableRow className="tr-table">
      <TableCell>Nhân viên</TableCell>
      <TableCell>Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {employees.map((employee) => (
      <TableRow
        key={employee.id}
        onClick={() => setSelectedRow(selectedRow === employee.id ? null : employee.id)}
      >
        <TableCell className="flex items-center gap-2">
        <img
            src="logo1.png"
            alt="Logo"
            className="w-6 h-6 rounded-full object-cover" // Kích thước n
          />
          <span>{employee.name} - {employee.department} - {employee.location}</span>
        </TableCell>
        <TableCell>{employee.count}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>

</div>
    </div>
  </div>
</CardContent>
      </Card>
      <DetailTable />
    </section>   
  );
}
