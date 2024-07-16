# Advent of Code CLI Tool

This CLI tool provides an interface for interacting with the Advent of Code puzzles directly from your terminal or Visual Studio Code. With this tool, you can:

- **Fetch Puzzle Inputs and Statements :** Quickly download the input data and problem statements for any specific day.
- **Generate Solution Templates :** Automatically create a template for your solution in the language of your choice.
- **Submit Solutions :** Submit your solutions directly from the command line and see if they are correct.

## Installation
### Prerequisites
- *Node.js 22.3.0*
- *pnpm 9.4.0*

### Steps
1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```
2. Install the dependencies
```bash
pnpm install
```
3. Link the package
```bash
npm link
```
4. Set up the environment variable with your Advent of Code session cookie
```bash
AOC_COOKIE=<your-advent-of-code-session-cookie>
```
Replace <your-advent-of-code-session-cookie> with your actual session cookie. You can find this cookie by inspecting your browser while logged into the Advent of Code website.

## Usage

Once the CLI tool is installed and linked, you can use the aoc command to interact with Advent of Code platform.

## Commands
### Get Commands
#### Get Input
Fetches the input for a specified year and day.
```bash
aoc get input <yearDay> <destination>
```
Example
```bash
aoc get input 2023-01 ./inputs
```

#### Get Problem Statement
Fetches the problem statement for a specified year and day.
```bash
aoc get problem <yearDay> <destination>
```
Example
```bash
aoc get problem 2023-01 ./statements
```

#### Get All Resources
Fetches all resources (input and problem statement) for a specified year and day.
```bash
aoc get all <yearDay> <destination>
```
Example
```bash
aoc get all 2023-01 ./2023/day1/resources
```
### Generate Command
#### Generate Template
Generates a solution template function in JavaScript.

```bash
aoc generate template <destination>
```
Example
```bash
aoc generate template ./solutions/day1
```

### Submit Command
#### Submit Answer
Submits your solution for the specified year, day, and part.

```bash
aoc submit <yearDay> <solutionPath> <functionName>
```
Example
```bash
aoc submit 2023-01 ./solutions/day1.js solve
```

## Contribution
If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push the branch.
4. Open a pull request detailing your changes.<br><br>
---
<br>

*Thank you for using the Advent of Code CLI tool. I hope it enhances your Advent of Code puzzle-solving experience ! If you encounter any issues or have suggestions for improvement, please open an issue on the repository.*

*This project is inspired from the script developed by <a href="https://github.com/luca-montaigut">LazyRabbit</a> for <a href="https://github.com/codinglab-io">Codinglab Community</a> that I'm part of and reused with his agreement.*
