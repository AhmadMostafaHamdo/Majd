export default function TransformData(data){
    const selectedData=new window.Date(data);
    const  getFulYear=selectedData.getFullYear();
    const  getMonth=(selectedData.getMonth()+ 1).toString().padStart(2,"0");
    const  getDay=selectedData.getDate().toString().padStart(2,"0");;
    return `${getFulYear}-${getMonth}-${getDay}`
}