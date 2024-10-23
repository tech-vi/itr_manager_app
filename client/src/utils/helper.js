// # date and time format

export const convertUTCtoIST = (utc) => {
  const date = new Date(utc);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const ist = date.toLocaleString("en-IN", options);
  return ist;
};

// # date format

export const convertUTCtoISTDate = (utc) => {
  const date = new Date(utc);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const ist = date.toLocaleString("en-IN", options);
  return ist;
};

// # dashboard functions

export const filterClients = (clientData, yearId) => {
  if (clientData) {
    if (yearId === "") {
      return clientData;
    }
    return clientData.filter((client) => client.financial_year?._id === yearId);
  }
  return [];
};

export const getITRTypeCounts = (filteredClients, itrFormTypes) => {
  return itrFormTypes?.map(
    (type) =>
      filteredClients.filter((client) => client.itr_form_type.title === type)
        .length
  );
};

export const getITRStatusCounts = (filteredClients, itrFormTypes) => {
  return itrFormTypes?.map(
    (type) =>
      filteredClients.filter((client) => client.itr_form_status.title === type)
        .length
  );
};

// # manage local storage

export const setLocalStorageData = (key, value, expiryDays = null) => {

  const item = {
    // value: typeof value === "object" ? JSON.stringify(value) : value,
    value,
    expiry: expiryDays ? Date.now() + expiryDays * 24 * 60 * 60 * 1000 : null,
  };

  localStorage.setItem(key, JSON.stringify(item));
};


export const getLocalStorageData = (key) => {
  const storedItem = localStorage.getItem(key);

  if (!storedItem) {
    return null;
  }

  try {
    const item = JSON.parse(storedItem);
    const now = new Date().getTime();

    if (item.expiry && now > item.expiry) {
      localStorage.removeItem(key);
      return null;
    }

    // const lsData = typeof item.value === "string" ? JSON.parse(item.value) : item.value;
    const lsData = item.value;
    return lsData;
  } catch (error) {
    // console.log(error);
    return null;
  }
};

