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
  	height: 1.2,
  },
  shadowOpacity: 0.3,
  shadowRadius: 2,
}

export const cardProject = {
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  paddingBottom: 16,
};

export const cardReview = {
  backgroundColor: '#007AFF',
  ...shadow,
  ...base,
};

export const cardTask = {
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  paddingBottom: 16,
};

export const cardFile = {
  display: 'flex',
  flexDirection:"row",
  alignItems: 'center',
  backgroundColor: '#fff',
  ...shadow,
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
