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
  borderWidth: 1,
  borderColor: '#007AFF',
  ...base,
};

export const cardTask = {
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  paddingBottom: 16,
};

export const cardNotStarted = {
  backgroundColor: '#fff',
  borderBottomWidth: 1,
  borderBottomColor: '#e5e5e5',
  marginBottom: 10,
  paddingBottom: 10,
};

export const cardFile = {
  display: 'flex',
  flexDirection:"row",
  alignItems: 'center',
  backgroundColor: '#fff',
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
  maxWidth: '100%',
  overflow: 'hidden'
};
