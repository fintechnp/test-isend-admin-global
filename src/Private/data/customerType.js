export const customerType = {
    INDIVIDUAL: 'I',
    ORGANIZATION: 0,
    isIndividual: function (value) {
        return this.INDIVIDUAL === value?.trim()?.toUpperCase()
    },
    isOrganization: function (value) {
        return this.ORGANIZATION === value?.trim()?.toUpperCase()
    }
}