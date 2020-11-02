export const base = {
  borderRadius: 5,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 16,
  paddingBottom: 20,
}

export const shadow = {
  shadowColor: "#000",
  shadowOffset: {
  	width: 0,
  	height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 2,
}

export const cardProject = {
  backgroundColor: '#fff',
  ...shadow,
  ...base,
};

export const cardReview = {
  backgroundColor: '#007AFF',
  ...shadow,
  ...base,
};

export const cardTask = {
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
