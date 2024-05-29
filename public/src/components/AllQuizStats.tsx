import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { useReduxSelector,reduxDispatch } from "../store";
import Loading from "./Loading";
import { setEditingRoleId,changeUserRole,deleteUser } from "../features/admin/adminSlice";
import { generateIMG } from "../utils/helperFunctions";

const AllQuizStats = () => {
    const [stateRole,setStateRole] = useState<string>("");
    const {allUserStats,editingId,isLoading} = useReduxSelector((store)=>store.admin);
    const dispatch = reduxDispatch();
    const cancelEditingHandler = ()=>{
        dispatch(setEditingRoleId({id:"",role:""}));
    }
    const roleChangeHandler = (e:ChangeEvent<HTMLSelectElement>,id:string,defaultRole:string):void => {
        const role = e.target.value;
        setStateRole(role);
        if(role === defaultRole){
            return cancelEditingHandler()
        }
        cancelEditingHandler();
        dispatch(setEditingRoleId({id,role}));
    }
    if(isLoading){
        return <div className="users-list">
            <Loading/>
        </div>
    }
  return (
      <div className="users-list">
          {allUserStats.map((userStat) => {
              const { user:id, name, role, quizDoneAmount } = userStat;
              const roleIMG = generateIMG(role);
              const stylingAdmin = role === "admin" ? { border: "2px solid #ee2849" } : {};
              return <article className="user" style={stylingAdmin}>
                  <h4><strong>{name}</strong></h4>
                  <h4>Quizes done : <strong>{quizDoneAmount}</strong></h4>
                  <div>
                      <label htmlFor="role">Role:
                      </label>
                      <select disabled={role === "admin" ? true : false} name="role" id="role" className="role-selection" onChange={(e)=>roleChangeHandler(e,id,role)} value={editingId === id ? stateRole : role}>
                          <option value="user">User</option>
                          <option value="question-guru">Question-guru</option>
                          <option value="admin">Admin</option>
                      </select>
                  </div>
                  <NavLink to={`singleQuizStat?id=${id}`}>Details...</NavLink>
                  <button className="btn delete-btn" disabled={role === "admin" ? true : false} onClick={()=>dispatch(deleteUser(id))}>Delete User</button>
                  {editingId === id && <button className="btn edit-btn" onClick={()=>dispatch(changeUserRole())}>Edit</button>}
                  {editingId === id && <button className="btn edit-btn" onClick={cancelEditingHandler}>Cancel</button>}
                  <img srcSet={roleIMG} />
              </article>
          })}
      </div>
  )
}
export default AllQuizStats