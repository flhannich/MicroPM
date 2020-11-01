export const base = {
  // borderRadius: 5,
  // paddingLeft: 16,
  // paddingRight: 16,

}

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
  	width: 2,
  	height: 4,
  },
  shadowOpacity: 0.18,
  shadowRadius: 8,}

export const cardProject = {
  backgroundColor: '#fff',
  borderRadius: 10,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 20,
  paddingBottom: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  ...base,
};

export const cardReview = {
  backgroundColor: '#007AFF',
  borderRadius: 10,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 20,
  paddingBottom: 20,
  ...shadow,
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

export const cardStatus = {
  display: 'flex',
  flexDirection:"row",
  alignItems: 'center',
};

export const cardTitle = {
  display: 'flex',
  flexDirection:"row",
  flexWrap: "wrap",
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
  maxWidth: '100%',
  overflow: 'hidden'
};
