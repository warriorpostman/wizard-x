import React, { Component } from 'react';
import logo from './logo.svg';
import { Machine, interpret } from 'xstate';

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      machine: {
      id: 'wizard',
      initial: 'create_organization',
      states: {
        create_organization: { on: { 
          NEXT: 'add_new_group',
        }
        },
        add_new_group: { on: { 
          NEXT: 'add_available_product',
          PREVIOUS: 'create_organization' 
        } 
        },
        add_available_product: { on: {
          NEXT: 'add_new_administrator',
          PREVIOUS: 'add_new_group' 
        } 
        },
        add_new_administrator: { on: { 
          PREVIOUS: 'add_available_product' 
        } 
        }
      }
      }, currentValue: 'create_organization'
    };
  }

  render() {
		// Stateless machine definition
		// machine.transition(...) is a pure function used by the interpreter.
    const wizardMachine = Machine(
      Object.assign(this.state.machine, { initial: this.state.currentValue })
    );

    const wizard = interpret(wizardMachine)
      .onTransition(state => console.log('new state', state))
      .start();

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>State machines are pretty sweet. This is a demonstration of implementing 
            xstate to build a conventional "wizard" user interface.
          </p>
					<p>
            CURRENT STATE: {this.state.currentValue}
					</p>
          <div>
            <button
              onClick={() => this.setState({ currentValue: wizard.send('PREVIOUS').value })}
            >
              PREVIOUS
            </button>
            <button
              onClick={() => this.setState({ currentValue: wizard.send('NEXT').value })}
            >
              NEXT
            </button>
          </div>
          <div>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
