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
