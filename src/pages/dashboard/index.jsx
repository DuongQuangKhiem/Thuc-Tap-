import React, { useEffect, useState } from 'react';
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

  const workplaceOptions = [
    
  ];
 
  const details = {
    
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
 
const [data, setData] = useState([]);
const [metaData, setMetaData] = useState({});

useEffect(() => {
  const fetchData = async () => {
    try {
      const [resV2, resV1] = await Promise.all([
        fetch('https://apitestchat.hasaki.vn/api/v1/user/getPendingMentionOfEmployeeV2', {
          method: 'GET',
          headers: {
            'accept': 'application/json, text/plain, */*',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoxLCJwYXJ0bmVyX3VzZXJfaWQiOiI2IiwibWFqb3JfaWQiOjE0MiwibmFtZSI6IsSQaW5oIEjDsmEgSGnhu4dwIiwiaWF0IjoxNzQ0MjcxNDM2fQ.OhPNolInHY3AgI8_S4xqszs4T1ifRJKw8vB2XyC-TYs',
          },
        }).then(res => res.json()),

        fetch('https://apitestchat.hasaki.vn/api/v1/user/getPendingMentionOfEmployee', {
          method: 'GET',
          headers: {
            'accept': 'application/json, text/plain, */*',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoxLCJwYXJ0bmVyX3VzZXJfaWQiOiI2IiwibWFqb3JfaWQiOjE0MiwibmFtZSI6IsSQaW5oIEjDsmEgSGnhu4dwIiwiaWF0IjoxNzQ0MjcxNDM2fQ.OhPNolInHY3AgI8_S4xqszs4T1ifRJKw8vB2XyC-TYs',
          },
        }).then(res => res.json()),
      ]);

      console.log('Employee list (V2):', resV2);
      console.log('Meta data (V1):', resV1);

      setData(resV2?.data?.list || []);
      setMetaData(resV1?.data?.metaData || {});

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

//bộ phận
const departmentCount = data.reduce((acc, item) => {
  const department = item.partner_user_department || 'Chưa xác định';
  acc[department] = (acc[department] || 0) + 1;
  return acc;
}, {});
//option bộ phận
const departmentOptions = metaData?.department_summerize?.map(dept => ({
  label: dept.name,
  value: dept.id, // hoặc bạn có thể dùng dept.name làm value nếu muốn
}));

//nghiệp vụ
const majorCount = data.reduce((acc, item) => {
  const major = item.partner_user_major || 'Chưa xác định';
  acc[major] = (acc[major] || 0) + 1;
  return acc;
}, {});

 //option nghiep vu
 const jobOptions = metaData?.major_summerize?.map(major => ({
  label: major.name,
  value: major.id, // hoặc major.name nếu bạn thích
}));

//vi tri
const positionSet = new Set(
  data.map(item => item.partner_user_position || 'Chưa xác định')
);

//option vi tri
const positionOptions = Array.from(positionSet).map(position => ({
  label: position,
  value: position,
}));

//group nv
const userCount = data.reduce((acc, item) => {
  const id = item.partner_user_id;
  if (!acc[id]) {
    acc[id] = {
      name: item.partner_user_name,
      major: item.partner_user_major,
      department: item.partner_user_department, // hoặc field khác nếu bạn có địa chỉ
      avatar: item.avatar_url || '', // avatar_url là giả sử, bạn đổi đúng field nếu có
      count: 0,
    };
  }
  acc[id].count += 1;
  return acc;
}, {});

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
  className="w-full"
  options={jobOptions}
  value={job}
  onChange={setJob}
  placeholder="Nghiệp vụ"
  isMulti
  closeMenuOnSelect={false}
  components={{ Option: CustomOption }}
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
    <h3 className="text-lg mb-4">Tổng: {data.total_cxl}</h3>
    </div>
    
    <div className="tables-wrapper">
      <div className="table">
      <Table>
  <TableHead className="tr-table">
    <TableRow>
      <TableCell className="text-center">Bộ phận</TableCell>
      <TableCell className="text-center-sl">Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody className="text-tbody">
    {metaData?.department_summerize?.map((dept, index) => (
      <TableRow key={index}>
        <TableCell>{dept.name}</TableCell>
        <TableCell className="text-center-count">{dept.count}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
      </div>

      <div className="table">
      <Table>
  <TableHead>
    <TableRow className="tr-table">
      <TableCell className="text-center" >Nghiệp vụ</TableCell>
      <TableCell className="text-center-sl">Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody className="text-tbody">
    {metaData?.major_summerize?.map((major, index) => (
      <TableRow key={index}>
        <TableCell>{major.name}</TableCell>
        <TableCell className="text-center-count">{major.count}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
      </div>

      <div className="table">
      <Table>
  <TableHead>
    <TableRow className="tr-table">
      <TableCell className="text-center">Nhân viên</TableCell>
      <TableCell className="text-center-sl" >Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {metaData?.user_summerize?.map((user, index) => (
      <TableRow key={index}>
        <TableCell>
          <div className="user-info">
            <img 
              className="user-avatar" 
              src={user.avatar} 
              alt={user.name} 
            />
            <div className="user-details">
              <div className="user-name"><b>{user.name}</b></div>
              <div className="user-meta">
                {user.infomation_short}
              </div>
            </div>
          </div>
        </TableCell>
        <TableCell className="text-center-count">{user.count}</TableCell>
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
