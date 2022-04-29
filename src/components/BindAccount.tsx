import React, { useEffect, useState } from 'react'

function BindAccount(props) {
  const [bind, setBind] = useState(false);
  const [input, setInput] = useState({
    email: '',
    confirmEmail: ''
  });
 
  const [error, setError] = useState({
    email: '',
    confirmEmail: ''
  })
  const [submitDisable, setSubmitDisable] = useState(true)


  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: value
    }));
    validateInput(e);
  }
 
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError(prev => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "email":
          if (!value) {
            console.log(value, !value);
            stateObj[name] = "Please confirm Email.";
          } else if (input.confirmEmail && value !== input.confirmEmail) {
            stateObj["confirmEmail"] = "Email and Confirm Email does not match.";
          } else {
            stateObj["confirmEmail"] = input.confirmEmail ? "" : error.confirmEmail;
          }
          break;
 
        case "confirmEmail":
          if (!value) {
            stateObj[name] = "Please enter Confirm Email.";
          } else if (input.email && value !== input.email) {
            stateObj[name] = "Email and Confirm Email does not match.";
          }
          break;
 
        default:
          break;
      }

 
      return stateObj;
    });
    
  }

  const bindAccount = async () => {
    await props.getBalanceOf();
    setBind(true);
  }


  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e.target);
    setBind(false);
  }

  useEffect(() => {
    if (input.email.length > 0 && input.email.length > 0 && !error.email && !error.confirmEmail){
      console.log('allow submit');
      setSubmitDisable(false);
    } else {
      console.log('disable submit');
      setSubmitDisable(true);
    }
  }, [input, error]);

  const ownTemplate = (
    <>
      {/* <div className='bg-gray-200 justify-center items-center'>
        <p className='text-center font-bold'>擁有</p>
        <ul>
          {props.tokens.map((token, index) => (
            <li key={index}>編號：{token.id} {token.claimed? "(已提領)":""}</li>
          ))}
        </ul>
      </div> */}

      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
          <h2 className="text-lg">會員資料確認</h2>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='email'>帳號</label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.email}
              placeholder='you@gmail.com'
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.email? <span className="text-red-500 text-xs italic">{error.email}</span> : null}
          </div>
          <div className='mb-4'>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='confirmEmail'>帳號確認</label>
            <input
              type="email"
              id="confirmEmail"
              name="confirmEmail"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.confirmEmail}
              placeholder='you@gmail.com'
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.confirmEmail? <span className="text-red-500 text-xs italic">{error.confirmEmail}</span> : null}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor='walletAddress'>錢包地址</label>
            <p id='walletAddress' className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight break-words">
              {props.defaultAccount}
            </p>
              {/* <input
                type="text"
                id="walletAddress"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={props.defaultAccount}
                overflow
                disabled={true}
              /> */}
          </div>
          
          <div className="flex items-end p-6 border-t border-solid border-slate-200 rounded-b">
            <button
              className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              onClick={() => setBind(false)}
            >
              Close
            </button>
            <button
              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="submit"
              disabled={submitDisable}
            >
              Confirm
            </button>
          </div>
        </form>
      </div >

    </>
  );

  const noOwnTemplate = (
    <>
      <p className="my-4 text-slate-500 text-lg leading-relaxed text-left">本帳號無Lalala NFT.</p>
      <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
        <button
          className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setBind(false)}
        >
          Close
        </button>
      </div>
    </>
  );
  return (
    <div>
      <button type="button" className='mt-5 p-5 bg-gray-400 text-xl rounded-md text-center' onClick={() => bindAccount(true)}>Bind Account</button>
      {bind ?
        (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                      Bind Account
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 bg-gray-400 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setBind(false)}
                    >
                      <span className="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        ×
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {props.balanceNFT > 0 ? ownTemplate : noOwnTemplate}
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
    </div>
  );
}

export default BindAccount;