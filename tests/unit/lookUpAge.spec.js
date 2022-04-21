import { screen, cleanup, render, fireEvent } from '@testing-library/vue'
import '@testing-library/jest-dom'
import HomePage from '../../src/pages/HomePage.vue'

// reset
afterEach(() => {
  cleanup()
})

// mock fetch -- replacing global fetch
global.fetch = jest.fn().mockImplementation(age => {
  console.log(age)
  return Promise.resolve({
    json: () => Promise.resolve({ age: 45 }),
  })
})

// if use axios, import the mock fetch

// Look up your age: Type Elbert in the input field
//-> click "Look up your age” button
//-> Expect 60 years old in the returned text

test('Look up your age section display properly', () => {
  // const { html } = render(HomePage)
  // console.log(html())
  render(HomePage)
  expect(screen.getByText('Quiz Time!')).toBeInTheDocument()
  expect(screen.getByTestId('age-input')).toBeInTheDocument()
  expect(screen.getByTestId('age-button')).toBeDefined()
  // toBetrue -- absolutely , toBeTrucy -- non empty string, positibe integer
})


// Test a component
// test input we specify and get the action we expect
// Mock a fetch methods -- resolve ourself or write mock function
test.only('Check Look up your age function', async () => {
  render(HomePage)
  const ageInput = screen.getByTestId('age-input')
  await fireEvent.update(ageInput, 'Elbert')
  await fireEvent.click(screen.getByTestId('age-button'))
  const result = await screen.findByText(/45 years/)
  expect(result).toBeInTheDocument()
})


// DONNOT DO -- fetch API call in the test as the result might change in the future

