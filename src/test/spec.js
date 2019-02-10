const {Rover, RoverCommand} = require('../index');

describe('Rover - Deploy Rover', () => {
  
  it(`Should throw TypeError on wrong initialization "new Rover()"`, () => {
    expect(() => new Rover()).toThrow(TypeError);
    expect(() => new Rover('')).toThrow(TypeError);
    expect(() => new Rover({})).toThrow(TypeError);
    expect(() => new Rover([])).toThrow(TypeError);
    expect(() => new Rover('A', 'B', 'C')).toThrow(TypeError);   
  });

  it(`Throw TypeError on wrong initialization "new RoverCommand()"`, () => {
    expect(() => new RoverCommand(1, 1, 'C')).toThrow(TypeError);
  })

  it(`Should deploy by configuration array`, async () => {
    const RoverCommandMars = new RoverCommand([
      ['Rover 1', '1 2 N', 'LMLMLMLMM'],
      ['Rover 2', '3 3 E', 'MMRMMRMRRM']
    ])
    await RoverCommandMars.deploy()
    const rovers = RoverCommandMars.getRovers()
    expect(typeof rovers).toEqual('object');
    expect(rovers['Rover 1'].getCoordinates()).toEqual('1 2 N');
    expect(rovers['Rover 2'].getCoordinates()).toEqual('3 3 E');    
  });


  it(`Should deploy new Rover(1, 2, N) and command('LMLMLMLMM') should result in x: 1, y: 3, direction: 'N'`, (done) => {
    const Rover1 = new Rover(1, 2, 'N')
    Rover1.command('LMLMLMLMM').then(() => {
      expect(Rover1.getX()).toEqual(1);
      expect(Rover1.getY()).toEqual(3)
      expect(Rover1.getCoordinates()).toEqual('1 3 N');
      expect(Rover1.getDirection()).toEqual('N');
      done()
    })
  });

  it(`Should deploy new Rover(3, 3, E) and command('MMRMMRMRRM') should result in x: 5, y: 1, direction: 'E'`, async () => {
    const Rover2 = new Rover(3, 3, 'E')
    await Rover2.command('MMRMMRMRRM')
    expect(Rover2.getX()).toEqual(5);
    expect(Rover2.getY()).toEqual(1);
    expect(Rover2.getCoordinates()).toEqual('5 1 E');
    expect(Rover2.getDirection()).toEqual('E');
  });

})