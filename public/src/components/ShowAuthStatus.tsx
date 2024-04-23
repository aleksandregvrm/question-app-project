
const ShowAuthStatus = () => {
  console.log('somethiung');

  setTimeout(()=>{
    console.log('someting else');
    
  })
  Promise.resolve().then(function(){
    console.log('something3');
    
  })
  console.log('something four');
  
  

  return (
    <div>ShowAuthStatus</div>
  )
}

export default ShowAuthStatus