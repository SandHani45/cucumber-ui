import React, { memo } from 'react'
const SelectDropdown = ({
    label,
    options,
    defaultValue,
    onChange

}) => {
  console.log('-----------options', options)
  return (
    <>
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        id="select-dropdown"
        onChange={onChange}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>Select</option>
        {options.map(({
            value, label
        })=>{
            return <option value={value}>{label}</option>
        })}
      </select>
    </>
  );
};
export default memo(SelectDropdown);
