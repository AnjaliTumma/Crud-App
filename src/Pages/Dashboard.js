import './Dashboard.css';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Dashboard(){
  
    const [popup,setPopUp]=useState(false)
    const [popup1,setPopUp1]=useState(false)
  
    const [name,setName]=useState('')
    const [jno,setJNo]=useState('')
    const [ctype,setCtype]=useState('')
    const [curTeam,setCurTeam]=useState('')
    const [teamName,setTeamName]=useState('')
    const [sid,setID]=useState(0)
    const [actionText, setActionText] = useState('Add Student')
  
    // show data
    const toggle1=()=>{
      setPopUp1(popup1=>!popup1)
  
      setName('')
      setJNo('')
      setCtype('SELECT')
      setCurTeam('')
      setTeamName('SELECT')
    }
  
    const [userData,setUserData]=useState([])
    useEffect(()=>{
      fetchUsers()
    },[])
  
    const fetchUsers=async()=>{
      const res=await fetch('http://localhost:8555/api/teammembers')
      const data=await res.json()
      console.log(data.message)
      setUserData(data.message)
    }
  
    // insert data
    const toggle=()=>{
      setPopUp(popup=>!popup)
      setActionText('Add Student')
      setName('')
      setJNo('')
      setCtype('SELECT')
      setCurTeam('SELECT')
      setTeamName('SELECT')
  
    }
  
    const onCricketSubmit=async(e)=>{
      e.preventDefault();
      if(actionText==='Add Student') {
        console.log(name,jno,ctype,curTeam,teamName);
        const res=await fetch('http://localhost:8555/api/insert',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name:name,
            jno:jno,
            ctype:ctype,
            curTeam:curTeam,
            teamName:teamName
          })
        })
        const data=await res.json();
        if(data.status){
          notify(data.message)
          setName('')
          setJNo('')
          setCtype('')
          setCurTeam('')
          setTeamName('')
          setTimeout(()=>{
            toggle()
            fetchUsers()
          },6000);
        }
        else{
          notify('Something went Wrong!!')
        }
      }
      else if(actionText==='Edit Student') {
        console.log(name,jno,ctype,curTeam,teamName);
        const res=await fetch(`http://localhost:8555/api/update/${sid}`,{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify({
            name:name,
            jno:jno,
            ctype:ctype,
            curTeam:curTeam,
            teamName:teamName
          })
        })
        const data=await res.json();
        if(data.status){
          notify(data.message)
          setName('')
          setJNo('')
          setCtype('')
          setCurTeam('')
          setTeamName('')
          setTimeout(()=>{
            toggle()
            fetchUsers()
          },6000);
        }
        else{
          notify('Something went Wrong!!')
        }
      }
    }
  
    // Edit Data
  
    const editStudent=(index,sid)=>{
      
      console.log('clickedd')
      setID(sid)
      setName(userData[index].name)
      setJNo(userData[index].jno)
      setCtype(userData[index].ctype)
      setCurTeam(userData[index].curTeam)
      setTeamName(userData[index].teamName)
      // toggle()  
      setPopUp(popup=>!popup)
      setActionText('Edit Student')
    }
  
  
    // Delete Data
    const deleteStudent= async(sid)=>{
      setID(sid)
      console.log(sid)
      const res=await fetch(`http://localhost:8555/api/delete/${sid}`,{
        method:'DELETE'
      })
      const data = await res.json()
      console.log(data)
      if(data.status){
        notify(data.message)
        // fetchUsers()
      }else{
        notify('Something went wrong !!')
      }
    }
  
    return(
        <>
        <div className="App">
          <div className='header'>
            <div className='logo'>
              <h1>Student Management System</h1>
            </div>
            <div className='navs'>
              
              <button onClick={toggle}>ADD</button>
              <button onClick={toggle1}>SHOW</button>
            </div>
          </div>
          <div className='details'>
          
          </div>
        </div>
        {
          popup &&
          <div className='insertForm'>
          
          <div className='box'>
            <div className='title'>
                <h3>{actionText}</h3>
                <label onClick={toggle}>X</label>
              </div>
              <form onSubmit={onCricketSubmit}>
                <div className='input-fields'>
                  <label>Name</label>
                  <input type='text'
                    value={name} 
                    onChange={(e)=>setName(e.target.value)}
                    required></input>
                </div>
               
                <div className='input-fields'>
                  <label>Mobile Number</label>
                  <input type='number' 
                  value={jno} 
                  onChange={(e)=>setJNo(e.target.value)}
                  required></input>
                </div>
                <div className='input-fields'>
                  <label>Gender</label>
                  <select
                    value={ctype} 
                    onChange={(e)=>setCtype(e.target.value)}
                    required
                  >
                    <option>Select </option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                   
                  </select>
                </div>
                <div className='input-fields'>
                  <label>Department</label>
                   <select
                     value={curTeam} 
                     onChange={(e)=>setCurTeam(e.target.value)}
                    required
                  >
                    <option>Select Department </option>
                    <option value='CSE'>CSE</option>
                    <option value='IT'>IT</option>
                    <option value='CE'>CE</option>
                    <option value='E&TC'>E&TC</option>
                  </select>
                </div>
                <div className='input-fields'>
                  <label>Year</label>
                  <select
                  value={teamName} 
                  onChange={(e)=>setTeamName(e.target.value)}
                  required
                  >
                    <option>Select </option>
                    <option value='1st Year'>1st Year</option>
                    <option value='2nd Year'>2nd Year</option>
                    <option value='3rd Year'>3rd Year</option>
                    <option value='4th  Year'>4th  Year</option>
                    
                  </select>
                </div>
                <div className='input-fields'>
                  {/* <input type='submit' onClick={notify} value="ADD Cricketer"></input> */}
                  <button >{actionText}</button>
                </div>
              </form>
          </div>
  
        </div>
        }
        {
          popup1 &&
          <div className='showData'>
             
              <div className='tableData'>
                <div className='info'>
                  
                  {/* <h2>SQUAD</h2> */}
                </div>
                <table>
                      <thead>
                          <tr>
                              <th>Sr No.</th>
                              <th>Student Name</th>
                              <th>Mobile Number</th>
                              <th>Gender</th>
                              <th>Department</th>
                              <th>Year</th>
                              <th>Operations</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                              userData.map((item,index)=>(
                                  <tr key={item}>
                                      {/* <td>{index+1}</td> */}
                                      <td>{item.id}</td>
                                      <td>{item.name}</td>
                                      <td>{item.jno}</td>
                                      <td>{item.ctype}</td>
                                      <td>{item.curTeam}</td>
                                      <td>{item.teamName}</td>
                                      
                                      <td className='table-action'>
                                          <button onClick={()=>editStudent(index,item.id)}><i className="fa-solid fa-pen-to-square"></i></button>
                                          <button onClick={()=>deleteStudent(item.id)}><i className="fa-solid fa-trash"></i></button>
                                      </td>
                                  </tr>
                              ))
                         }
                      </tbody>
  
                  </table>
              </div>
            
          </div>
        }
        <ToastContainer />
  
      </>
  
    );
}
export default Dashboard;