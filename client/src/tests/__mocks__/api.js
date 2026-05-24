const QRBoxerApi = {
  token: null,

  login: jest.fn().mockResolvedValue({ success: true }),
  signup: jest.fn().mockResolvedValue({ success: true }),
  getCurrentUser: jest.fn(),
  saveProfile: jest.fn(),

  getMoves: jest.fn(),
  getMove: jest.fn(),
  createmove: jest.fn(),

  getBoxes: jest.fn(),
  getBox: jest.fn(),
  createbox: jest.fn(),
  removebox: jest.fn(),
  getBoxesbyMove: jest.fn(),

  getItems: jest.fn(),
  getItem: jest.fn(),
  createitem: jest.fn(),
  removeitem: jest.fn(),
  getItemsbyBox: jest.fn(),

  request: jest.fn()
};

export default QRBoxerApi;
