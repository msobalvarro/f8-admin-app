import { Colors } from '@/constants/colors'
import { Dimensions, StyleSheet } from 'react-native'

export const { height: HeightScreen, width: WidthScreen } = Dimensions.get('window')

export const NotFoundStyles = StyleSheet.create({
  container: {
    height: HeightScreen,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
})

export const UiStyles = StyleSheet.create({
  InputStyle: {
    backgroundColor: Colors.light.background + '10',
    borderRadius: 5,
    padding: 10,
    minWidth: 150,
    color: '#FFF',
    fontSize: 18,
    borderWidth: 1,
  },
})

export const LayoutStyles = StyleSheet.create({
  scrollContainer: {
    height: HeightScreen
  },
  rootContainer: {
    height: HeightScreen,
    width: WidthScreen,
  },
})

export const LoginStyles = StyleSheet.create({
  scrollContainer: {
    height: HeightScreen
  },
  container: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: 30,
  },

  InputsContainer: {
    gap: 10,
  },

  title: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center',
  },

  imageLogo: {
    alignSelf: 'center',
    width: 128,
    height: 128,
    resizeMode: 'contain',
  }
})

export const ProductsStyles = StyleSheet.create({
  subContainerInformation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    // justifyContent: 'center',
  },

  title: {
    paddingVertical: 50,
    fontSize: 34,
    color: '#FFF',
  },

  productContainerList: {
    gap: 30
  },

  inputContainer: {
    gap: 20
  },

  productContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.cardBackgrond,
    gap: 25,
    padding: 20,
  },

  containerTitle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 20,
    gap: 20,
  },

  productTitle: {
    fontSize: 20,
    color: Colors.primaryLight,
  },

  description: {
    color: '#FFF',
  },

  buttonContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    gap: 10,
  },
})

export const CarousellStyle = StyleSheet.create({
  container: {
    width: WidthScreen,
    height: 250,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  scroll: {
    flexDirection: 'row',
    // gap: 10,
  },
  image: {
    width: WidthScreen * 0.81,
    height: 250,
    borderRadius: 10,
  },
})

export const ContainerLayoutStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLayout,
    flex: 1,
    width: WidthScreen,
    paddingBottom: HeightScreen * 0.05,
    paddingHorizontal: WidthScreen * 0.05,
  },
  containerScroll: {
    backgroundColor: Colors.backgroundLayout,
    flex: 1,
    width: WidthScreen,
    height: HeightScreen,
  },
  scroll: {
    paddingHorizontal: WidthScreen * 0.05,
  }
})

export const TittleViewStyles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerTitle: {
    flex: 1,
    gap: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subtitle: {
    paddingRight: 10,
    fontSize: 16,
    color: '#FFF',
  },
  button: {
    paddingLeft: 20,
  },
})

export const ProductImageStyles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    position: 'absolute',
    borderRadius: 5,
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    zIndex: 1,
  },
  image: {
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    aspectRatio: 1,
    shadowRadius: 5,
    borderRadius: 10,
    // height: 200,
    width: '100%',
    zIndex: 0,
  },
})

export const MenuStyles = StyleSheet.create({
  container: {
    paddingVertical: 30,
  },
  button: {
    gap: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    borderBottomWidth: 1,
  },
  text: {
    color: '#FFF',
    fontSize: 28,
  },
})

export const PreferenceStyles = StyleSheet.create({
  containerList: {
    gap: 20,
  }
})

export const MessageStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 20
  }
})

export const MessageItemStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: Colors.cardBackgrond,
    borderRadius: 10,
    padding: 15,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primaryLight,
  },
  time: {
    fontSize: 14,
    color: '#AAA',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 14,
    color: '#FFF',
    marginVertical: 5,
  },
  detailContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  detailTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#CCC',
    width: 80,
  },
  detailText: {
    fontSize: 14,
    color: '#FFF',
  },
  messageContainer: {
    marginVertical: 10,
  },
  messageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#CCC',
  },
  messageText: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
    lineHeight: 20,
  },

  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
    width: '100%',
  }
})

export const ContactButtonsStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
  }
})

export const UserListStyles = StyleSheet.create({
  container: {
    // padding: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: Colors.cardBackgrond,
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    gap: 15,
    // elevation: 2,
  },
  containerNames: {
    justifyContent: 'space-between',
    // flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primaryLight,
  },
  username: {
    fontSize: 16,
    color: '#555',
    marginVertical: 4,
  },
  date: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  dateContainer: {
    // marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 5,
  },
  containerButtons: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
})

export const NewUserStyles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    gap: 20,
  },
})

export const NewPreferenceStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.backgroundLayout,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '90%',
    alignSelf: 'center',
    gap: 10,
  }
})

export const JobsStyles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 20
  }
})

export const ItemJobStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackgrond,
    borderRadius: 12,
    padding: 15,
    gap: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
  },
  location: {
    fontSize: 14,
    color: '#A0A0A0',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#E0E0E0',
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
  },
  status: {
    marginTop: 10,
    alignSelf: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  active: {
    backgroundColor: '#28A745',
  },
  inactive: {
    backgroundColor: '#DC3545',
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },

  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  containerCounter: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
  },

  textCount: {
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.light.text,
  }
})

export const TagStyles = StyleSheet.create({
  container: {},
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tagText: {
    marginRight: 5,
    color: Colors.light.text,
  },
  removeTag: {
    color: Colors.delete,
    fontWeight: 'bold',
  },
  input: UiStyles.InputStyle
})

export const tagsInputStyles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: '#FFF',
    fontSize: 12,
  },
})

export const ItemApplicationJobStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackgrond,
    borderRadius: 12,
    padding: 15,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00BFFF',
  },
  text: {
    // fontSize: 16,
    color: Colors.dark.text,
  },
  textDate: {
    textAlign: 'right',
    fontSize: 12,
    color: '#A0A0A0',
  }
})
