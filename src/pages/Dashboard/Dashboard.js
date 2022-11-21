import React,{useEffect,useState} from "react";
import Sidebar from '../../pages/Dashboard/Sidebar';

function Dashboard() {
  const [proceedDash,setproceedDash] = useState(false)

  useEffect(() => {
    if(localStorage.getItem('loginToken')){
      setproceedDash(true)
    }else{
      setproceedDash(false)
      window.location.href="/login"
    }
  },[])

  return (
    <div>
      {
        proceedDash ? <Sidebar /> : null
      }
      
    </div>
  );
}

export default Dashboard;
