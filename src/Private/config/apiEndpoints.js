const apiEndpoints = {
  countryStates: {
    list: "common/:country/states",
    create: "common/states",
    update: "common/states/:stateId",
    delete: "common/states/:stateId",
  },
};

export default apiEndpoints;
