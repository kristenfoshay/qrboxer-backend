// Mock implementation of the QRBoxerApi
const QRBoxerApi = {
  token: null,

  // Authentication methods
  login: jest.fn().mockResolvedValue({ success: true }),
  signup: jest.fn().mockResolvedValue({ success: true }),
  getCurrentUser: jest.fn(),
  saveProfile: jest.fn(),

  // Move-related methods
  getMoves: jest.fn(),
  getMove: jest.fn(),
  createmove: jest.fn(),

  // Box-related methods
  getBoxes: jest.fn(),
  getBox: jest.fn(),
  createbox: jest.fn(),
  removebox: jest.fn(),
  getBoxesbyMove: jest.fn(),

  // Item-related methods
  getItems: jest.fn(),
  getItem: jest.fn(),
  createitem: jest.fn(),
  removeitem: jest.fn(),
  getItemsbyBox: jest.fn(),

  // Base request method (typically this wouldn't be called directly in tests)
  request: jest.fn()
};

export default QRBoxerApi;