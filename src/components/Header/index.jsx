import React, { memo, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Logo from "./../../logo/enbd_logo.svg";
import { Link } from "react-router-dom";
import { fetchFeatureStepSlice } from "../../features/featureStepSlice";
const Header = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch()
  const onChangeSearch = (e) => {
    setUrl(e.target.value)
  };

  const onClickSearch = useCallback(() => {
    localStorage.setItem('url', url)
    dispatch(fetchFeatureStepSlice({url}));
  },[dispatch, url]);
  
  return (
    <nav className="flex p-1 bg-[#182f7c] py-3 basis-1/4 justify-between">
      <div className="flex gap-2">
        {/* <img className="w-32" src={Logo} alt="logo" /> */}
        <Link className="font-mono font-bold p-2 text-white" to={"/"}>
          LEAP UI
        </Link>
      </div>
      <div
        className="relative flex w-[30rem] mr-2"
      >
        <>
        <input
          type="search"
          name="search"
          className="peer text-white block min-h-[auto] w-full rounded bg-transparent border-solid border-2 border-white px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none "
          placeholder="Copy your git repository"  
          aria-label="Search"
          id="search-input"
          aria-describedby="search-button"
          onChange={onChangeSearch}
        />

        <button
          className="relative z-[2] -ms-0.5 flex items-center rounded-e bg-white px-5  text-xs font-medium uppercase leading-normal text-primary shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
          type="button"
          id="search-button"
          data-twe-ripple-init
          data-twe-ripple-color="light"
          onClick={onClickSearch}
        >
          <span className="[&>svg]:h-5 [&>svg]:w-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </span>
        </button>
        </>
        <>
        {/* <div className="form-control w-[10rem] flex justify-center ml-2">
          <label className="label cursor-pointer">
            <span className="label-text text-white">AI Mode</span>
            <input type="checkbox" className="toggle-warning toggle" defaultChecked />
          </label>
        </div> */}
        </>
      </div>
    
    </nav>
  );
};

export default memo(Header);
