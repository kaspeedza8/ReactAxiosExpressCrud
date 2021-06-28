import Axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const getEmployee = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const updateEmpolyee = (id) => {
    Axios.put("http://localhost:3001/update" , { wage:newWage, id: id }).then((response)=>{
      setEmployeeList(
        employeeList.map((val) => {
          return val.id == id ? {
            id: val.id,
            name: val.name,
            country : val.country,
            age: val.age ,
            position: val.position,
            wage: newWage
          } : val;
        })
      )
    })
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response)=>{
      setEmployeeList(
        employeeList.filter((val) =>{
          return val.id != id;
        })
      )
    })
  }

  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then(() => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        }
      ])
    })
  }

  return (
    <div className="App">
      <h1>ข้อมูลพนักงาน</h1>
      <form action="">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            ชื่อ
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="กรอกชื่อ"
            onChange={(event) => {
              setName(event.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            อายุ
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="กรอกอายุ"
            onChange={(event) => {
              setAge(event.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            จังหวัด
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="กรอกจังหวัด"
            onChange={(event) => {
              setCountry(event.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="position" className="form-label">
            ตำแหน่ง
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="กรอกตำแหน่ง"
            onChange={(event) => {
              setPosition(event.target.value);
            }}
          ></input>
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            เงินเดือน
          </label>
          <input
            type="number"
            className="form-control"
            placeholder="กรอกเงินเดือน"
            onChange={(event) => {
              setWage(event.target.value);
            }}
          ></input>
        </div>
        <button className="btn btn-success" onClick={addEmployee}>
          เพิ่มพนักงาน
        </button>
      </form>

      <hr />
      <div className="employess">
        <button className="btn btn-primary" onClick={getEmployee}>
          แสดงพนักงาน
        </button>

        {employeeList.map((val, key) => {
          return (
            <div className="employee card mt-3">
              <div className="card-body text-left">
                <p className="card-text">ชื่อ : {val.name}</p>
                <p className="card-text">อายุ : {val.age}</p>
                <p className="card-text">จังหวัด : {val.country}</p>
                <p className="card-text">ตำแหน่ง : {val.position}</p>
                <p className="card-text">เงินเดือน : {val.wage}</p>
                <div className="d-flex">
                  <input type="text" style={{width: "300px"}}
                   placeholder="15000..." className="form-control" onChange={(event) =>{
                     setNewWage(event.target.value)
                   }}
                   />
                   <button className="btn btn-warning" onClick={() => {updateEmpolyee(val.id)}}>แก้ไข</button>
                   <button className="btn btn-danger" onClick={() => {deleteEmployee(val.id)}}>ลบ</button>
                   
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
