import React, {useState} from 'react'
import {
  Checkbox,
  Container,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControlLabel,
  IconButton,
  InputBase,
  makeStyles,
  Typography
} from '@material-ui/core';
import {
  AccessAlarm as DateIcon,
  AddCircleOutline as AddCircleOutlineIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  ExpandMore as ExpandMoreIcon,
  Search as SearchIcon
} from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  expensionSummary: {
    position: 'relative',
    display: 'block'
  },
  todoItemFormControl: {
    width: 'calc(100% - 180px)',
  },
  optionButtonArea: {
    position: 'fixed',
    outline: '0 !important',
    right: 85,
    // marginTop: '6px',
  },
  optionButtons: {
    outline: '0 !important',
    margin: 'auto'
  },
  dateField: {
    position: 'relative',
    outline: '0 !important',
    margin: 'auto',
    textAlign: 'center',
    marginRight: 30,
    marginTop: 10,
    border: '1px solid #ccc',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#00000010',
    fontSize: '0.875rem'
  },
  dateIcon: {
    position: 'absolute',
    top: -15,
    left: 'calc(50% - 12px)'
  },
  rootButton: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  optionButtonPopper: {
    zIndex: 9
  },
  filterArea: {
    marginBottom: 20,
    
  },
  search: {
    position: 'relative',
    borderRadius: 5,
    backgroundColor: '#fff',
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 300,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    }
  },
  addTodoItemButton: {
    display: 'block',
    outline: '0 !important',
    margin: 'auto',
    marginTop: 5
  },
  addTodoItemButtonIcon: {
    color: '#67af50',
    fontSize: 50
  },
}));

function TodoItemList(props) {
  const classes = useStyles();
  let lists = props.list.todoList;
  let filteredLists;
  
  const [searchText, setSearchText] = useState('');
  
  if (props.list.id) {
    filteredLists = props.list.todoList.filter((list) => list.name.includes(searchText));
  } else {
    filteredLists = [];
  }
  
  const twoDigitDateTextMaker = (time) => {
    let text = time.toString();
    if (text.toString().length > 1) {
      return text;
    } else {
      return '0' + text;
    }
  }
  
  const calculateFullDate = (time) => {
    // Return Type -> DD.MM.YY  HH:MM
    const eventDate = new Date(time);
    const resDate = twoDigitDateTextMaker(eventDate.getUTCDate()) + '.' + twoDigitDateTextMaker(eventDate.getUTCMonth() + 1) + '.' + twoDigitDateTextMaker(eventDate.getUTCFullYear());
    const resClock = twoDigitDateTextMaker(eventDate.getHours()) + ':' + twoDigitDateTextMaker(eventDate.getMinutes());
    return {
      date: resDate,
      clock: resClock
    };
  }
  
  const editTodo = (event, list, index) => {
    event.stopPropagation();
    props.openEditDialog(list, index);
  }
  
  const removeTodo = (event, list, index) => {
    event.stopPropagation();
    lists.splice(index, 1);
    props.updateTodoList({name: props.list.name, todoList: lists});
  }
  
  const checkboxToggle = (event, list) => {
    event.stopPropagation();
    list.isComplete = !list.isComplete;
    props.updateTodoList({name: props.list.name, todoList: lists});
  }
  
  
  if (props.list.id) {
    return (
      <Container maxWidth="lg" className={classes.container}>
        <h2>{props.list.name}</h2>
        <div className={classes.filterArea}>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              onChange={(text) => {
                setSearchText(text.target.value)
              }}
              value={searchText}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{'aria-label': 'search'}}
            />
          </div>
        </div>
        {props.list.todoList.length > 0 &&
        <div className={classes.root}>
          {filteredLists.map((list, index) => {
            const fullDate = calculateFullDate(list.date);
            return (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon/>}
                  aria-label="Expand"
                  aria-controls="additional-actions1-content"
                  id="additional-actions1-header"
                >
                  <FormControlLabel
                    className={classes.todoItemFormControl}
                    aria-label="Acknowledge"
                    onClick={(event) => {
                      checkboxToggle(event, list);
                    }}
                    onFocus={(event) => event.stopPropagation()}
                    control={<Checkbox checked={list.isComplete}/>}
                    label={list.name}
                  />
                  <Typography className={classes.dateField}>
                    <DateIcon className={classes.dateIcon} color="secondary"/>
                    {fullDate.date}
                    <br/>
                    {fullDate.clock}
                  </Typography>
                  <IconButton aria-label="edit" className={classes.optionButtons} onClick={(event) => {
                    editTodo(event, list, index);
                  }}>
                    <EditIcon/>
                  </IconButton>
                  <IconButton aria-label="delete" className={classes.optionButtons} onClick={(event) => {
                    removeTodo(event, list, index);
                  }}>
                    <DeleteIcon/>
                  </IconButton>
                
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography color="textSecondary">
                    {list.detail}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
        }
        {props.list.todoList.length === 0 &&
        <div>
          <h5 style={{textAlign: 'center', padding: 25}}>Listenizde Todo Item bulunmamakta aşağıdaki buton ile yeni bir
            Todo Item ekleyebilirsiniz.</h5>
        </div>
        }
        <IconButton aria-label="edit" className={classes.addTodoItemButton} onClick={(event) => {
          props.openNewTodoDialog();
        }}>
          <AddCircleOutlineIcon className={classes.addTodoItemButtonIcon}/>
        </IconButton>
      </Container>
    );
  } else {
    return (
      <div>
        <h3 style={{textAlign: 'center', padding: 25}}>Kayıtlı bir Todo List bulunamadı, lütfen sol menüden ilk Todo
          List'inizi ekleyin.</h3>
      </div>
    )
  }
}

export default TodoItemList;
