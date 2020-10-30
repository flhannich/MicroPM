export const base = {
  // borderRadius: 5,
  // paddingLeft: 16,
  // paddingRight: 16,

}


export const cardReview = {
  backgroundColor: '#007AFF',
  borderRadius: 10,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 20,
  paddingBottom: 20,
  shadowColor: "#000",
  shadowOffset: {
  	width: 2,
  	height: 4,
  },
  shadowOpacity: 0.18,
  shadowRadius: 8,
  ...base,
};

export const card = {
  // paddingTop: 16,
  // paddingBottom: 16,
  // borderColor: '#ddd',
  // borderBottomWidth: 1,

  paddingTop: 10,
  paddingBottom: 10,
  borderLeftWidth: 3,
  paddingLeft: 16,
  borderColor: '#007AFF',
  ...base,
};

export const cardCompleted = {
  // paddingTop: 16,
  // paddingBottom: 16,
  // borderColor: '#ddd',
  // borderBottomWidth: 1,

  paddingTop: 10,
  paddingBottom: 10,
  borderLeftWidth: 3,
  paddingLeft: 16,
  borderColor: 'rgba(0, 0 ,0, .15)',
  ...base,
};

export const cardTitle = {
  display: 'flex',
  flexDirection:"row",
  alignItems: 'center',
  justifyContent:'space-between',
};
