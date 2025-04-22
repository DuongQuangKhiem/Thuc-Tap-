import React, { useRef, useEffect, useState } from 'react';
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Card from "@/components/ui/Card";
import CardContent from "@/components/ui/CardContent";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Search, RefreshCcw, RotateCcw } from "lucide-react";
import Select, { components } from "react-select";
import DatePicker from "react-datepicker";
import { ChartColumn } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import DetailTable from "./DetailTable";
import "./dashboard.css";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import {ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Pie, PieChart} from 'recharts';

export default function DashBoard() {
  const [showDetailTable, setShowDetailTable] = useState(false);
 


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
      fontSize: "11px",
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
      zIndex: 2,
    }),
    placeholder: (provided) => ({
      ...provided,
      position: "absolute",
      top: "56%",
      transform: "translateY(-50%)",
      zIndex: 1,
      pointerEvents: "none",
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
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
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
const [filters, setFilters] = useState([]);
const [receivers, setReceivers] = useState([]);
const [senders, setSenders] = useState([]);
const [showChart, setShowChart] = useState(false);
const [summarizedUsers, setSummarizedUsers] = useState(metaData?.user_summerize || []);
const totalFilteredCXL = summarizedUsers.reduce((sum, user) => sum + (user.count || 0), 0);
const popupRef = useRef(null);
const [chartType, setChartType] = useState('pie'); 
const [departmentData, setDepartmentData] = useState({});
const [majorData, setMajorData] = useState({});
const [combinedChartData, setCombinedChartData] = useState([]);
const [pieChartData, setPieChartData] = useState([]);



useEffect(() => {
  const fetchData = async () => {
    try {
      const [resV2, resV1, resFilters] = await Promise.all([
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

        fetch('https://apitestchat.hasaki.vn/api/v1/search/filters', {
          method: 'GET',
          headers: {
            'accept': 'application/json, text/plain, */*',
            'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJ0bmVyX2lkIjoxLCJwYXJ0bmVyX3VzZXJfaWQiOiI2IiwibWFqb3JfaWQiOjE0MiwibmFtZSI6IsSQaW5oIEjDsmEgSGnhu4dwIiwiaWF0IjoxNzQ0MjcxNDM2fQ.OhPNolInHY3AgI8_S4xqszs4T1ifRJKw8vB2XyC-TYs',
          },
        }).then(res => res.json()),
      ]);

      console.log('Employee list (V2):', resV2);
      console.log('Meta data (V1):', resV1);
      console.log('Filters:', resFilters);

      setData(resV2?.data?.list || []);
      setMetaData(resV1?.data?.metaData || {});
      setFilters(resFilters?.data || {});

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);

//nguoi nhan
const receiverCount = (data || []).reduce((acc, item) => {
  const receiver = item.partner_user_name || 'Chưa xác định';
  acc[receiver] = (acc[receiver] || 0) + 1;
  return acc;
}, {});
//options Người nhận
const receiverOptions = Object.keys(receiverCount).map((receiver) => ({
  label: `${receiver}`, 
  value: receiver,
}));
// Người gửi
const senderCount = (data || []).reduce((acc, item) => {
  const sender = item.from_partner_user_name || 'Chưa xác định';
  acc[sender] = (acc[sender] || 0) + 1;
  return acc;
}, {});

// Options người gửi
const senderOptions = Object.keys(senderCount).map((sender) => ({
  label: sender,
  value: sender,
}));


// Bộ phận
const departmentCount = data.reduce((acc, item) => {
  const department = item.partner_user_department || 'Chưa xác định';
  acc[department] = (acc[department] || 0) + 1;
  return acc;
}, {});
// Options bộ phận
const departmentOptions = filters?.departments || [];

// Nghiệp vụ
const majorCount = data.reduce((acc, item) => {
  const major = item.partner_user_major || 'Chưa xác định';
  acc[major] = (acc[major] || 0) + 1;
  return acc;
}, {});
// Options nghiệp vụ
const jobOptions = filters?.majors || [];

// Vị trí
const positionSet = new Set(
  data.map(item => item.position || 'Chưa xác định')
);
// Options vị trí
const positionOptions = filters?.positions || [];

// Nơi làm việc
const locationSet = new Set(
  data.map(item => item.location || 'Chưa xác định')
);
// Options nơi làm việc
const locationOptions = filters?.locations || [];

// Group nhân viên
const userCount = data.reduce((acc, item) => {
  const id = item.partner_user_id;
  if (!acc[id]) {
    acc[id] = {
      name: item.partner_user_name,
      major: item.partner_user_major,
      department: item.partner_user_department, 
      avatar: item.avatar_url || '',
      count: 0,
    };
  }
  acc[id].count += 1;
  return acc;
}, {});
//oke phan lọc nhan vien
// loc du lieu
const [filtersState, setFiltersState] = useState({
  department: [],
  job: [],
  position: [],
  workplace: [],
  receivers: [],
  senders: [],
  startDate: null,
  endDate: null,
});

const [filteredData, setFilteredData] = useState(data || []); // Lúc đầu là full data

// Khi thay đổi select option => chỉ update filtersState
const handleFilterChange = (key, value) => {
  setFiltersState(prev => ({
    ...prev,
    [key]: value,
  }));
};
const [summarizedDepartment, setSummarizedDepartment] = useState({});
const [hasFiltered, setHasFiltered] = useState(false);
const [summarizedMajor, setSummarizedMajor] = useState({});


// lọc dữ liệu 
const handleApplyFilters = () => {
  const isNoFilterApplied =
    !filtersState.receivers.length &&
    !filtersState.senders.length &&
    !filtersState.department.length &&
    !filtersState.job.length &&
    !filtersState.position.length &&
    !filtersState.workplace.length &&
    !filtersState.startDate &&
    !filtersState.endDate;

  if (isNoFilterApplied) {
    // Không lọc: reset về dữ liệu gốc
    setFilteredData(data || []);

    const deptSummary = {};
    const majorSummary = {};

    (metaData?.department_summerize || []).forEach(item => {
      deptSummary[item.name || 'Chưa xác định'] = item.count;
    });

    (metaData?.major_summerize || []).forEach(item => {
      majorSummary[item.name || 'Chưa xác định'] = item.count;
    });

    setSummarizedDepartment(deptSummary);
    setSummarizedMajor(majorSummary);
    setSummarizedUsers(metaData?.user_summerize || []);
    setHasFiltered(false);

    // Cập nhật dữ liệu biểu đồ
    const allKeys = Array.from(new Set([...Object.keys(deptSummary), ...Object.keys(majorSummary)]));
    const combinedData = allKeys.map(name => ({
      name,
      department: deptSummary[name] || 0,
      major: majorSummary[name] || 0,
    }));
    const pieData = [
      {
        name: 'Bộ phận',
        value: Object.values(deptSummary).reduce((acc, val) => acc + val, 0),
        fill: '#8884d8',
      },
      {
        name: 'Nghiệp vụ',
        value: Object.values(majorSummary).reduce((acc, val) => acc + val, 0),
        fill: '#82ca9d',
      },
    ];

    setCombinedChartData(combinedData);
    setPieChartData(pieData);
    return;
  }

  // Có áp dụng lọc
  const newFilteredData = (Array.isArray(data) ? data : []).filter(item => {
    const itemDate = item.time ? new Date(item.time) : null;

    const matchesFilters = [
      { selected: filtersState.department, field: item.partner_user_department },
      { selected: filtersState.job, field: item.partner_user_major },
      { selected: filtersState.position, field: item.partner_user_position },
      { selected: filtersState.workplace, field: item.location },
      { selected: filtersState.receivers, field: item.partner_user_name },
      { selected: filtersState.senders, field: item.from_partner_user_name }
    ].every(({ selected, field }) =>
      !selected.length || selected.some(opt => opt.label === (field || 'Chưa xác định'))
    );

    const matchesDateRange =
      (!filtersState.startDate || (itemDate && itemDate >= filtersState.startDate)) &&
      (!filtersState.endDate || (itemDate && itemDate <= filtersState.endDate));

    return matchesFilters && matchesDateRange;
  });

  setFilteredData(newFilteredData);

  // Tổng hợp theo bộ phận & nghiệp vụ
  const departmentSummary = {};
  const majorSummary = {};

  newFilteredData.forEach(item => {
    const dept = item.partner_user_department || 'Chưa xác định';
    departmentSummary[dept] = (departmentSummary[dept] || 0) + 1;

    const major = item.partner_user_major || 'Chưa xác định';
    majorSummary[major] = (majorSummary[major] || 0) + 1;
  });

  setSummarizedDepartment(departmentSummary);
  setSummarizedMajor(majorSummary);
  setHasFiltered(true);

  // Cập nhật dữ liệu biểu đồ sau lọc
  const allKeys = Array.from(new Set([...Object.keys(departmentSummary), ...Object.keys(majorSummary)]));
  const combinedData = allKeys.map(name => ({
    name,
    department: departmentSummary[name] || 0,
    major: majorSummary[name] || 0,
  }));

  const pieData = [
    {
      name: 'Bộ phận',
      value: Object.values(departmentSummary).reduce((acc, val) => acc + val, 0),
      fill: '#8884d8',
    },
    {
      name: 'Nghiệp vụ',
      value: Object.values(majorSummary).reduce((acc, val) => acc + val, 0),
      fill: '#82ca9d',
    },
  ];

  setCombinedChartData(combinedData);
  setPieChartData(pieData);

  // Tổng hợp bảng nhân viên
  const userSummary = {};
  const userMetaMap = {};
  (metaData?.user_summerize || []).forEach(user => {
    if (user.partner_user_id) {
      userMetaMap[user.partner_user_id] = user;
    }
  });

  newFilteredData.forEach(item => {
    const id = item.partner_user_id || 'unknown';

    if (!userSummary[id]) {
      const userMeta = userMetaMap[id] || {};
      userSummary[id] = {
        name: userMeta.name || item.partner_user_name || 'Chưa xác định',
        count: 0,
        avatar: userMeta.avatar || '',
        infomation_short: userMeta.infomation_short || '',
        partner_id: userMeta.partner_id,
        partner_user_id: userMeta.partner_user_id,
      };
    }

    userSummary[id].count += 1;
  });

 // Lọc theo nơi làm việc nếu có chọn workplace filter
// Hàm chuẩn hóa chuỗi tiếng Việt bỏ dấu và lowercase
const selectedWorkplaces = filtersState.workplace.map(opt => opt.label);

// Hàm chuẩn hóa chuỗi tiếng Việt, viết thường, bỏ dấu
const normalize = str =>
  str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";

// Lọc nhân viên theo địa chỉ trong infomation_short
const summarizedUsers = Object.values(userSummary).filter(user => {
  if (!selectedWorkplaces.length) return true;

  const infoShort = normalize(user.infomation_short);
  return selectedWorkplaces.some(loc => infoShort.includes(normalize(loc)));
});

console.log("summarizedUsers:", summarizedUsers);
setSummarizedUsers(summarizedUsers);



};



// Nếu muốn load lại dữ liệu khi data thay đổi
useEffect(() => {
  setFilteredData(data || []);
}, [data]);

const isFiltered =
  filtersState.receivers.length ||
  filtersState.senders.length ||
  filtersState.department.length ||
  filtersState.job.length ||
  filtersState.position.length ||
  filtersState.workplace.length ||
  filtersState.startDate ||
  filtersState.endDate;


  const handleResetFilters = () => {
    // Reset filter state
    setFiltersState({
      department: [],
      job: [],
      position: [],
      workplace: [],
      receivers: [],
      senders: [],
      startDate: null,
      endDate: null,
    });
  
    // Hiển thị lại full data
    setFilteredData(data || []);
  
    // Reset thống kê bộ phận từ metaData
    const deptSummary = {};
    const majorSummary = {};
  
    (metaData?.department_summerize || []).forEach(item => {
      deptSummary[item.name || 'Chưa xác định'] = item.count;
    });
  
    (metaData?.major_summerize || []).forEach(item => {
      majorSummary[item.name || 'Chưa xác định'] = item.count;
    });
  
    setSummarizedDepartment(deptSummary);
    setSummarizedMajor(majorSummary);
    setHasFiltered(false); 
    const allKeys = Array.from(new Set([
      ...Object.keys(deptSummary),
      ...Object.keys(majorSummary),
    ]));
  
    const combinedData = allKeys.map(name => ({
      name,
      department: deptSummary[name] || 0,
      major: majorSummary[name] || 0,
    }));
  
    const pieData = [
      {
        name: 'Bộ phận',
        value: Object.values(deptSummary).reduce((acc, val) => acc + val, 0),
        fill: '#8884d8',
      },
      {
        name: 'Nghiệp vụ',
        value: Object.values(majorSummary).reduce((acc, val) => acc + val, 0),
        fill: '#82ca9d',
      },
    ];
  
    setDepartmentData(deptSummary);
    setMajorData(majorSummary);
    setCombinedChartData(combinedData);
    setPieChartData(pieData);
  };
  //xuat excel
  const handleExportExcel = () => {
    if (!filteredData.length) {
      alert("Không có dữ liệu để xuất Excel!");
      return;
    }
  
    // Chuyển dữ liệu thành định dạng phù hợp
    const exportData = filteredData.map((item, index) => ({
      STT: index + 1,
      "Người nhận": item.partner_user_name || 'Chưa xác định',
      "Người gửi": item.from_partner_user_name || 'Chưa xác định',
      "Bộ phận": item.partner_user_department || 'Chưa xác định',
      "Nghiệp vụ": item.partner_user_major || 'Chưa xác định',
      "Vị trí": item.partner_user_position || 'Chưa xác định',
      "Nội dung": item.parsed_text || 'Chưa xác định',
      "Thời gian": item.time ? new Date(item.time).toLocaleString() : '',
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách lọc');
  
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/octet-stream' });
  
    saveAs(dataBlob, 'DuLieuLoc.xlsx');
  };

  const allKeys = Array.from(new Set([
    ...Object.keys(departmentData),
    ...Object.keys(majorData),
  ]));
  



  useEffect(() => {
    if (!isFiltered && metaData?.user_summerize?.length) {
      setSummarizedUsers(metaData.user_summerize);
    }
  }, [metaData?.user_summerize, isFiltered]);
  
  //vung trong an chart
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowChart(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  useEffect(() => {
    if (!metaData) return;
  
    const deptData = {};
    const majorData = {};
  
    (metaData.department_summerize || []).forEach(item => {
      deptData[item.name || 'Chưa xác định'] = item.count;
    });
  
    (metaData.major_summerize || []).forEach(item => {
      majorData[item.name || 'Chưa xác định'] = item.count;
    });
  
    const allKeys = Array.from(new Set([
      ...Object.keys(deptData),
      ...Object.keys(majorData),
    ]));
  
    const combinedData = allKeys.map(name => ({
      name,
      department: deptData[name] || 0,
      major: majorData[name] || 0,
    }));
  
    const pieData = [
      {
        name: 'Bộ phận',
        value: Object.values(deptData).reduce((acc, val) => acc + val, 0),
        fill: '#8884d8',
      },
      {
        name: 'Nghiệp vụ',
        value: Object.values(majorData).reduce((acc, val) => acc + val, 0),
        fill: '#82ca9d',
      },
    ];
  
    setDepartmentData(deptData);
    setMajorData(majorData);
    setCombinedChartData(combinedData);
    setPieChartData(pieData);
  }, [metaData]);
  
 // Thêm useState để trigger apply filter tự động
 const shouldApplyRef = useRef(false);
 
 // Hàm xử lý click vào dòng bộ phận
 const handleSelectDepartment = (selectedDept) => {
   const selectedOption = departmentOptions.find(opt => opt.label === selectedDept);
   if (selectedOption) {
     console.log("Selected department:", selectedDept, selectedOption);
     shouldApplyRef.current = true;
     setFiltersState(prev => ({
       ...prev,
       department: [selectedOption],
     }));
   }
 };
 

// Hàm xử lý click vào dòng nghiệp vụ
const handleSelectMajor = (selectedMajor) => {
  const selectedOption = jobOptions.find(opt => opt.label === selectedMajor);
  if (selectedOption) {
    console.log("Selected major:", selectedMajor, selectedOption);
    shouldApplyRef.current = true;
    setFiltersState(prev => ({
      ...prev,
      job: [selectedOption],
    }));
  }
};



// Hàm xử lý click vào dòng nhân viên
const handleSelectUser = (selectedUserId) => {
  const selectedUser = summarizedUsers.find(user => user.partner_user_id === selectedUserId);
  if (selectedUser) {
    console.log("Selected user:", selectedUserId, selectedUser);
    shouldApplyRef.current = true;
    setFiltersState(prev => ({
      ...prev,
      receivers: [{ label: selectedUser.name, value: selectedUser.name }],
    }));
  }
};


// Auto apply filter sau khi filtersState thay đổi
useEffect(() => {
  if (shouldApplyRef.current) {
    console.log("Auto applying filters after table row click...");
    handleApplyFilters();
    shouldApplyRef.current = false;
  }
}, [filtersState]);
  
  return (
    <section className="p-6 text-white">
      <div className="form-container w-full h-full p-4">
        <div className="grid-container grid-cols-6 gap-4 items-center mb-4 w-full">
        <div className="col-span-2 flex w-full">
  <div className="button-group flex gap-2 w-full">
    <button className="btn-search btn" onClick={handleApplyFilters}>
      <Search size={14} />
    </button>

    <button className="btn-ref btn" onClick={handleResetFilters}>
    <RotateCcw size={14} />
    </button>

    <button className="btn-excel btn" onClick={handleExportExcel}>
      Xuất Excel
    </button>

    {/* Nút biểu đồ + popup */}
    <div style={{ position: 'relative' }}>
      <button className="btn-ref btn" onClick={() => setShowChart(!showChart)}>
      <ChartColumn size={16} />
      </button>

      {showChart && (
        <div
        ref={popupRef}
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            transform: 'translateX(-450px)',
            marginTop: '8px',
            width: '500px',
            height: '250px',
            backgroundColor: 'white',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            borderRadius: '8px',
            padding: '12px',
            zIndex: 9999,
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
          }}
        >
          {/* Biểu đồ tròn */}
          {chartType === 'pie' ? (
    <PieChart width={500} height={200}>
      <Pie
        data={pieChartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        label
      />
      <Tooltip />
      <Legend />
    </PieChart>
  ) : (
    <BarChart width={400} height={220} data={combinedChartData}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="department" fill="#8884d8" name="Bộ phận" />
      <Bar dataKey="major" fill="#82ca9d" name="Nghiệp vụ" />
    </BarChart>
  )}
   <button
  className="btn-ref btn"
  onClick={() => setChartType(chartType === 'pie' ? 'bar' : 'pie')}
  style={{ marginTop: '-200px' ,marginLeft: '35px' }}
>
  <RefreshCcw size={12} />
</button>

        </div>
      )}
    </div>
  </div>
</div>


       

          <div className="grid-rows-2 grid gap-4">
  <div className="grid grid-cols-4 gap-3">
  <div className="filter-item">
  <Select
  className="w-full"
  options={receiverOptions}
  value={filtersState.receivers}
  onChange={(selected) => handleFilterChange('receivers', selected || [])}
  placeholder="Người nhận"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
  menuPortalTarget={document.body}
  components={{ Option: CustomOption }}
/>
    </div>

    <div className="filter-item">
    <Select
  className="w-full"
  options={senderOptions}
  value={filtersState.senders}
  onChange={(selected) => handleFilterChange('senders', selected || [])}
  placeholder="Người gửi"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
  menuPortalTarget={document.body}
  components={{ Option: CustomOption }}
/>
</div>

    <div className="datepicker-Day">
    <DatePicker
  selected={filtersState.startDate}
  onChange={(date) => handleFilterChange('startDate', date)}
  selectsStart
  startDate={filtersState.startDate}
  endDate={filtersState.endDate}
  dateFormat="dd/MM/yyyy"
  placeholderText="Từ ngày"
  className="datepicker border"
/>
<span>→</span>
<DatePicker
  selected={filtersState.endDate}
  onChange={(date) => handleFilterChange('endDate', date)}
  selectsEnd
  startDate={filtersState.startDate}
  endDate={filtersState.endDate}
  minDate={filtersState.startDate}
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
  value={filtersState.department}
  onChange={(selected) => handleFilterChange('department', selected)}
  placeholder="Bộ phận"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
/>
  </div>

  <div className="filter-item">
  <Select
  className="w-full"
  options={jobOptions}
  value={filtersState.job}
  onChange={(selected) => handleFilterChange('job', selected)}
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
    value={filtersState.position}
    onChange={(selected) => handleFilterChange('position', selected)}
    placeholder="Vị trí"
    isMulti
    closeMenuOnSelect={false}
    styles={customStyles}
    components={{ Option: CustomOption }}
  />
</div>

<div className="filter-item">
<Select
  className="w-full custom-select"
  options={locationOptions}
  value={filtersState.workplace}
  onChange={(selected) => handleFilterChange('workplace', selected)}
  placeholder="Nơi làm việc"
  isMulti
  closeMenuOnSelect={false}
  styles={customStyles}
  components={{ Option: CustomOption }}
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
    <h3 className="text-lg mb-4">
  Tổng: {isFiltered
    ? totalFilteredCXL.toLocaleString()
    : (metaData?.total_cxl?.toLocaleString() ?? 0)}
</h3>

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
    {hasFiltered
      ? Object.entries(summarizedDepartment).map(([name, count], index) => (
          <TableRow
            key={index}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectDepartment(name)}
          >
            <TableCell>{name}</TableCell>
            <TableCell className="text-center-count">{count}</TableCell>
          </TableRow>
        ))
      : metaData?.department_summerize?.map((dept, index) => (
          <TableRow
            key={index}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectDepartment(dept.name)}
          >
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
      <TableCell className="text-center">Nghiệp vụ</TableCell>
      <TableCell className="text-center-sl">Số lượng</TableCell>
    </TableRow>
  </TableHead>
  <TableBody className="text-tbody">
    {(hasFiltered
      ? Object.entries(summarizedMajor).map(([name, count], index) => (
          <TableRow
            key={index}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectMajor(name)}
          >
            <TableCell>{name}</TableCell>
            <TableCell className="text-center-count">{count}</TableCell>
          </TableRow>
        ))
      : metaData?.major_summerize?.map((major, index) => (
          <TableRow
            key={index}
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => handleSelectMajor(major.name)}
          >
            <TableCell>{major.name}</TableCell>
            <TableCell className="text-center-count">{major.count}</TableCell>
          </TableRow>
        ))
    )}
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
  {summarizedUsers.map((user, index) => (
    <TableRow
  key={index}
  className="cursor-pointer hover:bg-gray-200"
  onClick={() => handleSelectUser(user.partner_user_id)}
>
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
      {!showDetailTable && (
  <div className="button-container mb-4">
    <button 
      className="btn-xct" 
      onClick={() => setShowDetailTable(true)}
    >
      Xem chi tiết
    </button>
  </div>
)}

{showDetailTable && (
  <DetailTable 
    data={filteredData} 
    onClose={() => setShowDetailTable(false)} 
  />
)}

    </section>   
  );
}