class App extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return(
            <div className="app">
                <TodoList />
            </div>
        );
    }
}

class TodoList extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [
                {
                    id: 0,
                    user: 0,
                    title: 'Testing',
                    description: 'This is a testing task',
                    isCompleted: false
                },
            ],
            count: 1,
            user: 0
        }
    }

    create = (task) => {
        this.setState({ 
            todos: [
                ...this.state.todos, 
                {
                    // remember to fix id => uuid
                    id: this.state.count,
                    user: this.state.user,
                    title: task,
                    description: '',
                    isCompleted: false 
                }
            ]
        });
        //delete when id => uuid
        this.setState(prevState => {
            return { count: prevState.count + 1 }
        });
    }

    complete = (id) => {
        const updates = this.state.todos.map(todo => {
            if(todo.id === id){
                return { ...todo, isCompleted: !todo.isCompleted }
            } else {
                return todo
            }
        });
        this.setState({ todos: updates });
    }

    update = (id, task) => {
        const updates = this.state.todos.map(todo => {
            if(todo.id === id){
                return { ...todo, title: task }
            } else {
                return todo
            }
        });
        this.setState({ todos: updates });
    }

    delete = (id) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    }

    render() {
        return(
            <div className="todo-list">
                <h1>To Do List</h1>
                <h3>Not Connected to a Database</h3>
                <ul>
                    {this.state.todos.map(todo => 
                        <Todo 
                            key={todo.id}
                            id={todo.id}
                            user={todo.user}
                            title={todo.title}
                            isCompleted={todo.isCompleted}
                            complete={this.complete}
                            update={this.update}
                            delete={this.delete}
                        />
                    )}
                </ul>
                <NewTodoForm create={this.create}/>
            </div>
        );
    }
}

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            task: this.props.title,
            isEditing: false
        }
    }

    toggle = () => {
        this.props.complete(this.props.id)
    }

    edit = () => {
        this.setState(prevState => {
            return { isEditing: !prevState.isEditing }
        });
    }

    handleUpdate = (evt) => {
        evt.preventDefault();
        this.props.update(this.props.id, this.state.task);
        this.setState({ isEditing: false })
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        if(this.state.isEditing){
            return(
                <div className="todo">
                    <form 
                        className="todo-edit-form"
                        onSubmit={this.handleUpdate}
                    >
                        <input 
                            type="text"
                            name="task"
                            value={this.state.task}
                            onChange={this.handleChange}
                        />
                        <button>Save</button>
                    </form>
                </div>
            );
        } else {
            return(
                <div className="todo">
                    <li 
                        className={this.props.isCompleted ? "todo-task-completed" : "todo-task"}
                        onClick={this.toggle}
                    >
                        {this.props.title}
                    </li>
                    <div className="todo-buttons">
                        <button 
                            className="todo-button"
                            onClick={this.edit}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-vector-pen" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M10.646.646a.5.5 0 0 1 .708 0l4 4a.5.5 0 0 1 0 .708l-1.902 1.902-.829 3.313a1.5 1.5 0 0 1-1.024 1.073L1.254 14.746 4.358 4.4A1.5 1.5 0 0 1 5.43 3.377l3.313-.828L10.646.646zm-1.8 2.908l-3.173.793a.5.5 0 0 0-.358.342l-2.57 8.565 8.567-2.57a.5.5 0 0 0 .34-.357l.794-3.174-3.6-3.6z"/>
                                <path fillRule="evenodd" d="M2.832 13.228L8 9a1 1 0 1 0-1-1l-4.228 5.168-.026.086.086-.026z"/>
                            </svg>
                        </button> 
                        <button 
                            className="todo-button"
                            onClick={() => this.props.delete(this.props.id)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            );
        }
    }
}

class NewTodoForm extends React.Component {
    constructor() {
        super();
        this.state = { task: "" }
    }

    handleSubmit = (evt) => {
        evt.preventDefault();
        this.props.create(this.state.task);
        this.setState({ task: "" })
    }

    handleChange = (evt) => {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    render() {
        return(
            <form 
                className="todo-form"
                onSubmit={this.handleSubmit}
            >
                <label htmlFor="task">Add New Task</label>
                <input
                    type="text"
                    placeholder="type something"
                    id="task"
                    name="task"
                    value={this.state.task}
                    onChange={this.handleChange}
                />
                <button>Add Task</button>
            </form>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);