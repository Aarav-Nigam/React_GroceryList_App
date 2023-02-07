function Alert({msg,type}){
    return (<>
    <p className={`position-absolute text-center alert alert-${type}`}>{msg}</p>
    </>)
}
export default Alert;