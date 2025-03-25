import React, { useState } from "react";
import  Button  from "@/components/ui/button";
import  Input  from "@/components/ui/input";
import  Card  from "@/components/ui/Card";
import  CardContent  from "@/components/ui/CardContent";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Search } from "lucide-react";
import { RefreshCcw } from "lucide-react";
import Select from "@/components/ui/CustomSelect"; 
import "./dashboard.css";







const DashBoard = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [department, setDepartment] = useState("");

  const departmentOptions = ["KAIZEN", "LOGISTICS", "SUPPLY CHAIN", "ADM", "F&A", "BOD", "CLINIC", "TECH"];
 
  const data = [
    { id: 1, department: "LOGISTICS", count: 3177, service: "Giao hàng nhanh" },
    { id: 2, department: "TECH", count: 9, service: "CSKH Cosmetic" },
    { id: 3, department: "SPA", count: 3, service: "Bác sĩ" },
    { id: 4, department: "SPA", count: 1, service: "CSKH Spa" }
  ];

  const details = {
    1: ["Phượngplat - 30", "Nguyễn Văn Cường - 28", "Phan Viết Huấn - 28", "Phan Minh Tánh - 27"],
    2: ["Nguyễn Minh Tuấn - 5", "Trần Đình Hoàng - 4"],
    3: ["Lê Thị Thu - 3"]
  };

  return (
    <section className="p-6 text-white">
      <div class="form-container">
      <div className="grid grid-cols-6 gap- mb-4">
      <div className="flex gap-2 justify-start">
      <div className="button-group flex gap-2 mt-4">
    <Button className="flex items-center gap-2">
      <Search size={14} /> 
    </Button>
    <Button className="flex items-center gap-2 bg-blue-600 text-white">
      <RefreshCcw size={14} />
    </Button>
    <Button className="bg-green-600 text-white">Xuất Excel</Button>
  </div>
</div>


        <br/>
        <Input placeholder="Người nhận" className="col-span-1" />
        <Input placeholder="Người gửi" className="col-span-1" />
        <Input placeholder="Từ ngày" className="col-span-1" type="date" />
        <Input placeholder="Đến ngày" className="col-span-1" type="date" />
        <br/>
        <div className="grid grid-cols-4 gap-4 mb-4 items-center">
        <Select
  className="custom-select"
  options={departmentOptions}
  value={department}
  onChange={setDepartment}
  placeholder="Bộ phận"
/>


  <Input placeholder="Nghiệp vụ" />
  <Input placeholder="Vị trí" />
  <Input placeholder="Nơi làm việc" />
  </div>
</div>
</div>
      <Card>
        <CardContent>
          <h3 className="text-lg font-bold mb-4">Số lượng chờ xử lý theo bộ phận/nghiệp vụ</h3>
          <Table>
            <TableHead>
              <TableRow className="bg-green-100">
                <TableCell>Bộ phận</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Nghiệp vụ</TableCell>
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
                  <TableCell>{row.service}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {selectedRow && (
            <div className="mt-4 p-4 border rounded bg-gray-50">
              <h2 className="text-lg font-bold mb-2">N/V có tin nhắn CXL nhiều nhất</h2>
              <Table>
                <TableHead>
                  <TableRow className="bg-green-100">
                    <TableCell>Tên nhân viên</TableCell>
                    <TableCell>Số lượng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {details[selectedRow].map((item, index) => {
                    const [name, count] = item.split(" - ");
                    return (
                      <TableRow key={index}>
                        <TableCell>{name}</TableCell>
                        <TableCell>{count}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
          <Button variant="outlined">Xem chi tiết</Button>
        </CardContent>
      </Card>
    </section>
  );
};

export default DashBoard;
