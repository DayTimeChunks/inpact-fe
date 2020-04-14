import * as React from "react";
import { Button, ButtonToolbar, Card, Form, FormGroup, Table } from "react-bootstrap";
import { throttle, debounce } from "lodash";
import { Redirect } from "react-router-dom";
import { LoremIpsum } from "lorem-ipsum";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faPlusCircle, faTimesCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// TODO: saveCampaign(): Send saved state to backend on saveCampaign()
// TODO: handleSubmit(): Submit form, sending final info to abckend and redirecting to campaign page
interface IAddCampaignProps {
  loggedIn: boolean;
  // user: IProfileProps;
}

interface IBaseList {
  name: string;
  description: string;
}

interface IBudget extends IBaseList {
  amount?: number;
}

interface IMilestone extends IBaseList {
  start?: Date;
}

type ISelectedList = IBudget | IMilestone;

interface IAddCampaignState {
  projectTitle: string;
  shortDescription: string;
  summary: string;
  background: string;
  detailedDescription: string;
  projectImpact: string;
  totalBudget: number;
  categories: any[];
  selectedCategories: string[];
  organizationName: string;
  organizationDescription: string;
  organizationWebsite: string;
  projectAdministrators: string[];
  projectAmbassadors: string[];
  milestones: IMilestone[];
  budget: IBudget[];
  threshold: number;
  addMilestone: boolean;
  addBudget: boolean;
  editMilestone?: IMilestone;
  editBudget?: IBudget;
  startDate: Date;
  saved: boolean;
  whatWith5: string;
  whatWith10: string;
  whatWith25: string;
  whatWith100: string;
  whatWith200: string;
  whatWith500: string;

}

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});

export default class AddCampaign extends React.Component<IAddCampaignProps, IAddCampaignState> {

  // Basic info
  private projectTitle = React.createRef<HTMLInputElement>();
  private shortDescription = React.createRef<HTMLInputElement>();
  private summary = React.createRef<HTMLTextAreaElement>();
  private addCategory = React.createRef<HTMLInputElement>();
  // private totalBudget = React.createRef<HTMLInputElement>();

  // Details
  private background = React.createRef<HTMLTextAreaElement>();
  private detailedDescription = React.createRef<HTMLTextAreaElement>();
  private projectImpact = React.createRef<HTMLTextAreaElement>();
  private organizationName = React.createRef<HTMLInputElement>();
  private organizationDescription = React.createRef<HTMLTextAreaElement>();
  private organizationWebsite = React.createRef<HTMLInputElement>();
  private addAdmins = React.createRef<HTMLInputElement>();
  private addAmbassadors = React.createRef<HTMLInputElement>();

  // Milestones
  private newMilestoneOrder = React.createRef<HTMLInputElement>();
  private newMilestoneName = React.createRef<HTMLTextAreaElement>();
  private newMilestoneDesc = React.createRef<HTMLTextAreaElement>();

  // Budget
  private newBudgetOrder = React.createRef<HTMLInputElement>();
  private newBudgetName = React.createRef<HTMLTextAreaElement>();
  private newBudgetAmount = React.createRef<HTMLInputElement>();
  private newBudgetDesc = React.createRef<HTMLTextAreaElement>();
  private thresholdBudget = React.createRef<HTMLInputElement>();

  // Conclusion

  private whatWith5 = React.createRef<HTMLInputElement>();
  private whatWith10 = React.createRef<HTMLInputElement>();
  private whatWith25 = React.createRef<HTMLInputElement>();
  private whatWith100 = React.createRef<HTMLInputElement>();
  private whatWith200 = React.createRef<HTMLInputElement>();
  private whatWith500 = React.createRef<HTMLInputElement>();

  // private handleInputThrottled: (e: any) => void;

  constructor(props: IAddCampaignProps) {
    super(props)
    const devBudget = [
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
      { name: lorem.generateSentences(1), description: lorem.generateSentences(2), amount: Math.round(100 * Math.random() * 100) / 100 },
    ]
    const totalBudget = devBudget.map(item => item.amount).reduce((acc, v) => acc! + v!, 0)

    this.state = {
      projectTitle: '',
      shortDescription: '',
      summary: '',
      background: '',
      detailedDescription: '',
      projectImpact: '',
      categories: [
        { text: "Education", id: 1 },
        { text: "Environment", id: 2 },
        { text: "Governance", id: 3 },
        { text: "Health", id: 4 },
        { text: "Women", id: 5 },
        { text: "Poverty reduction", id: 6 },
        { text: "Children", id: 7 },
      ],
      selectedCategories: [],
      organizationName: '',
      organizationDescription: '',
      organizationWebsite: '',
      projectAdministrators: [],
      projectAmbassadors: [],
      milestones: [
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
        { name: lorem.generateSentences(1), description: lorem.generateSentences(3), start: new Date() },
      ],
      budget: devBudget,
      totalBudget,
      threshold: totalBudget,
      addMilestone: false,
      addBudget: false,
      editMilestone: undefined,
      editBudget: undefined,
      startDate: new Date(),
      saved: false,
      whatWith5: '',
      whatWith10: '',
      whatWith25: '',
      whatWith100: '',
      whatWith200: '',
      whatWith500: '',
    }
    this.renderForm = this.renderForm.bind(this)
    this.onSelectedCategoriesChange = this.onSelectedCategoriesChange.bind(this)
    this.renderSelectedItemsSections = this.renderSelectedItemsSections.bind(this)
    this.handleAddCategory = this.handleAddCategory.bind(this)
    this.handleAddAdmins = this.handleAddAdmins.bind(this)
    this.handleAddAmbassadors = this.handleAddAmbassadors.bind(this)
    this.removeChoice = this.removeChoice.bind(this)
    this.saveCampaign = this.saveCampaign.bind(this)
    this.enterNewItem = this.enterNewItem.bind(this)
    this.deleteListItem = this.deleteListItem.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.renderNewMilestone = this.renderNewMilestone.bind(this)
    this.renderEditMilestone = this.renderEditMilestone.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.saveItem = this.saveItem.bind(this)

    this.renderTableBudget = this.renderTableBudget.bind(this)

    // Throttling
    this.handleInput = this.handleInput.bind(this)
    this.throttledInput = throttle(this.throttledInput.bind(this), 500, {trailing: true})
  }

  private handleInput(e: any) { // <- insert this method in: <input onChange={this.handleInput}/>.
    e.persist()

    // if event needs throttling:
    if (e.currentTarget && e.currentTarget.id) {
      // Filter for events to be throttled
      console.log('id', e.currentTarget.id)
      console.log('value', e.currentTarget.value)
      const rawEvent = {
        id: e.currentTarget.id,
        value: e.currentTarget.value
      }
      const property = 'threshold'
      this.throttledInput(property, rawEvent)
    }

    // else handle event as it comes.
    // f()
  }

  private throttledInput(property: string, rawEvent: any, e?: any) {
    switch (property) {
      case 'threshold':
        this.checkThreshold(rawEvent.value)
    }
  }

  private checkThreshold(value: number){

  }

  private onSelectedCategoriesChange(e: any) {
    const { selectedCategories } = this.state
    const choice = e.target.value
    if (!selectedCategories.includes(choice)) {
      selectedCategories.push(e.target.value)
      this.setState({ selectedCategories, saved: false })
    }
  }
  private renderCategories() {
    const { categories } = this.state
    return (
      <div>
        <Form.Label className="font-weight-bold mt-3">Project categories</Form.Label>
        <FormGroup>
          {/* value={categories} */}
          <Form.Control as="select" multiple onChange={this.onSelectedCategoriesChange}>
            {categories.map((option) => (
              <option key={option.id} value={option.text}>
                {option.text}
              </option>
            ))}
          </Form.Control>
        </FormGroup>
      </div>
    )
  }

  private removeChoice(e: any) {
    const { selectedCategories } = this.state
    selectedCategories.splice(selectedCategories.indexOf(e.target.value), 1)
    this.setState({ selectedCategories, saved: false })
  }

  private renderSelectedItemsSections(section: 'categories' | 'admins' | 'ambassadors') {
    const { selectedCategories, projectAdministrators, projectAmbassadors } = this.state;
    const selectionArray = section === 'categories' ? selectedCategories : section === 'admins' ? projectAdministrators : projectAmbassadors;
    const selection = () => {
      if (selectionArray.length > 0) {
        return (
          <ButtonToolbar className="mb-3">
            {selectionArray.map((cat, indx) => {
              return <Button key={indx} value={cat} variant="outline-dark" onClick={this.removeChoice} className="mx-1 my-1">{`${cat} ⨉`}</Button>
            })}
          </ButtonToolbar>
        )
      }
      return (
        <Card.Text className="text-center">
          No {section} chosen yet :(
        </Card.Text>
      )
    }
    return (
      <div>
        <Form.Label className="font-weight-bold mt-3">Chosen project {section}</Form.Label>
        <Card>
          <Card.Body>
            {selection()}
          </Card.Body>
        </Card>
      </div>)
  }

  private handleAddCategory() {
    const { selectedCategories } = this.state
    const choice = this.addCategory ? this.addCategory.current!.value : undefined

    if (choice && !selectedCategories.includes(choice)) {
      selectedCategories.push(choice)
      this.setState({ selectedCategories, saved: false })
    }
    this.addCategory.current!.value = '';
  }

  private handleAddAdmins() {
    const { projectAdministrators } = this.state
    const choice = this.addAdmins ? this.addAdmins.current!.value : undefined

    if (choice && !projectAdministrators.includes(choice)) {
      projectAdministrators.push(choice)
      this.setState({ projectAdministrators, saved: false })
    }
    this.addAdmins.current!.value = '';
  }
  private handleAddAmbassadors() {
    const { projectAmbassadors } = this.state
    const choice = this.addAmbassadors ? this.addAmbassadors.current!.value : undefined

    if (choice && !projectAmbassadors.includes(choice)) {
      projectAmbassadors.push(choice)
      this.setState({ projectAmbassadors, saved: false })
    }
    this.addAmbassadors.current!.value = '';
  }
  private enterNewItem(e: any) {
    e.preventDefault()
    switch (true) {
      case (e.currentTarget.id).includes('milestone'):
        this.setState({
          addMilestone: true,
          editMilestone: undefined
        });
        break;
      case (e.currentTarget.id).includes('budget'):
        this.setState({
          addBudget: true,
          editBudget: undefined
        });
        break;
      default:
        break;
    }
  }

  private cancelEdit(e: any) {
    e.preventDefault();
    switch (true) {
      case (e.currentTarget.id).includes('milestone'):
        this.setState({
          addMilestone: false,
          editMilestone: undefined
        });
        break;
      case (e.currentTarget.id).includes('budget'):
        this.setState({
          addBudget: false,
          editBudget: undefined
        });
        break;
      default:
        break;
    }
  }

  private handleDateChange(date: Date) {
    if (date) this.setState({ startDate: date });
  }

  private updateList(selectedList: ISelectedList[], entry: ISelectedList, name: string, description: string, oldOrder: number, newOrder?: number, editItem?: ISelectedList) {
    if (name && description && editItem) { // save edited field
      if (typeof newOrder === "number" && newOrder >= 0) {
        newOrder = newOrder < 0 ? 0 : newOrder;
        if (editItem) {
          if (oldOrder === newOrder) {
            selectedList.splice(newOrder, 1, entry);
          } else {
            selectedList.splice(oldOrder, 1); // delete old position
            selectedList.splice(newOrder, 0, entry); // insert it in new position
          }
        } else {
          selectedList.splice(newOrder, 0, entry);  // adding below
        }
      } else {
        selectedList.push(entry);
      }
      // save new field
    } else if (typeof newOrder === "number" && newOrder >= 0 && newOrder < selectedList.length) {
      // Handle middle insertion
      selectedList.splice(newOrder, 0, entry)
    } else {
      // Add at the end only
      selectedList.push(entry)
    }
    return selectedList;
  }

  private saveItem(e: any) {
    e.preventDefault()
    const oldOrder = parseInt((e.currentTarget.id).split('-')[0])
    let newOrder, name, description, entry;
    let selectedList: ISelectedList[];
    let { milestones, editMilestone, budget, editBudget, totalBudget, threshold } = this.state;
    switch (true) {
      case (e.currentTarget.id).includes('milestone'):
        newOrder = this.newMilestoneOrder.current ? parseInt(this.newMilestoneOrder.current.value) : undefined;
        name = this.newMilestoneName.current ? this.newMilestoneName.current.value : "";
        description = this.newMilestoneDesc.current ? this.newMilestoneDesc.current.value : "";
        entry = {
          name,
          description,
          start: this.state.startDate //.toLocaleString().split(',')[0]
        } as IMilestone;
        selectedList = this.updateList(milestones, entry, name, description, oldOrder, newOrder, editMilestone);
        this.setState({
          milestones: selectedList,
          addMilestone: false,
          editMilestone: undefined,
          saved: false
        })
        break;
      case (e.currentTarget.id).includes('budget'):
        newOrder = this.newBudgetOrder.current ? parseInt(this.newBudgetOrder.current.value) : undefined;
        name = this.newBudgetName.current ? this.newBudgetName.current.value : "";
        description = this.newBudgetDesc.current ? this.newBudgetDesc.current.value : "";
        let amount = this.newBudgetAmount.current ? this.newBudgetAmount.current.value : 0;
        entry = {
          name,
          description,
          amount: Number(amount) //.toLocaleString().split(',')[0]
        } as IBudget;
        const oldAmount = budget[oldOrder] ? budget[oldOrder].amount : 0;
        totalBudget = oldAmount ? totalBudget - oldAmount : totalBudget;
        totalBudget += Number(amount);
        threshold = threshold > totalBudget ? totalBudget : threshold;
        console.log('totalBudget', totalBudget)
        console.log('threshold', threshold)
        selectedList = this.updateList(budget, entry, name, description, oldOrder, newOrder, editBudget);
        this.setState({
          totalBudget,
          threshold,
          budget: selectedList,
          addBudget: false,
          editBudget: undefined,
          saved: false
        })
        break;
      default:
        console.error(`Missing list id type`);
        return;
    }
  }

  private tableHeader(header: string[]) {
    return (
      <tr>
        {header.map((item: string, indx: number) => {
          if (indx === 0) {
            return <th key={indx} className="order-width">{item}</th>
          }
          return <th key={indx}>{item}</th>
        })}
      </tr>
    )
  }

  private renderNewMilestone() {
    const { milestones } = this.state;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["Order #", "Milestone title", "Description", "Date", "Cancel", "Add"])}
        </thead>
        <tbody>
          <tr>
            <td><input className="rounded form-control" type="number" ref={this.newMilestoneOrder} required={true} placeholder="Order #" defaultValue={milestones.length} /> </td>
            <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newMilestoneName} required={true} placeholder="Title" />  </td>
            <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} ref={this.newMilestoneDesc} required={true} placeholder="Description" /> </td>
            <td><DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange} />
            </td>
            <td className='text-center'>
              <button id='milestone-render-new' onClick={this.cancelEdit} className='button-icon py-1'>
                <FontAwesomeIcon icon={faTrashAlt} size='2x' />
              </button>
            </td>
            <td className='text-center'>
              <button id='milestone-save-new' onClick={this.saveItem} className='button-icon py-1'>
                <FontAwesomeIcon icon={faPlusCircle} size='2x' />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  private renderNewBudget() {
    const { budget } = this.state;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["Order #", "Budget title", "Description", "Amount", "Cancel", "Add"])}
        </thead>
        <tbody>
          <tr>
            <td><input className="rounded form-control" type="number" ref={this.newBudgetOrder} required={true} placeholder="Order #" defaultValue={budget.length} /> </td>
            <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newBudgetName} required={true} placeholder="Title" />  </td>
            <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} ref={this.newBudgetDesc} required={true} placeholder="Description" /> </td>
            <td><input className="rounded form-control" type="number" ref={this.newBudgetAmount} required={true} placeholder="Amount $US" defaultValue={0} /> </td>
            <td className='text-center'>
              <button id='budget-render-new' onClick={this.cancelEdit} className='button-icon py-1'>
                <FontAwesomeIcon icon={faTrashAlt} size='2x' />
              </button>
            </td>
            <td className='text-center'>
              <button id='budget-save-new' onClick={this.saveItem} className='button-icon py-1'>
                <FontAwesomeIcon icon={faPlusCircle} size='2x' />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  private handleEdit(e: any) {
    // Renders the editable area visible
    e.preventDefault();
    switch (true) {
      case (e.currentTarget.id).includes('milestone'):
        let { milestones, editMilestone } = this.state;
        let start;
        if (!editMilestone) {
          const editMilestoneOrder = parseInt(e.currentTarget.value);
          const entry = milestones[editMilestoneOrder]
          start = entry.start as Date;
          editMilestone = {
            ...entry,
            start
          }
        } else {
          editMilestone = undefined;
          start = new Date();
        }
        this.setState({
          addMilestone: false,
          editMilestone,
          startDate: start
        })
        break;
      case (e.currentTarget.id).includes('budget'):
        // Renders the editable area visible
        e.preventDefault();
        let { budget, editBudget } = this.state;
        if (!editBudget) {
          const editOrder = parseInt(e.currentTarget.value);
          const entry = budget[editOrder]
          editBudget = {
            ...entry
          }
        } else {
          editBudget = undefined
        }
        this.setState({
          addBudget: false,
          editBudget
        })
        break;
      default:
        break;
    }
  }

  private renderEditBudget() {
    const { budget, editBudget } = this.state;
    const names = budget.map(element => element.name)
    const order = editBudget ? names.indexOf(editBudget.name) : budget.length;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["Order #", "Item", "Description", "Amount $US", "Cancel", "Save"])}
        </thead>
        <tbody>
          <tr>
            <td><input className="rounded form-control" type="number" ref={this.newBudgetOrder} required={true} placeholder="Order #" defaultValue={order} /> </td>
            <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newBudgetName} required={true} placeholder="Name" defaultValue={editBudget && editBudget.name} />  </td>
            <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} required={true} ref={this.newBudgetDesc} placeholder="Description" defaultValue={editBudget && editBudget.description} /> </td>
            <td><input className="rounded form-control" type="number" ref={this.newBudgetAmount} required={true} placeholder="Amount $US" defaultValue={editBudget && editBudget.amount} /> </td>
            <td className='text-center'>
              <button id='budget-cancel-edit' onClick={this.cancelEdit} className='button-icon py-1'>
                <FontAwesomeIcon icon={faTimesCircle} size='2x' />
              </button>
            </td>
            <td className='text-center'>
              <button id={`${order}-budget-save-edit`} onClick={this.saveItem} className='button-icon py-1'>
                <FontAwesomeIcon icon={faCheckCircle} size='2x' />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  private renderEditMilestone(type: string) {
    const { milestones, editMilestone } = this.state;
    const names = milestones.map(element => element.name)
    const order = editMilestone ? names.indexOf(editMilestone.name) : milestones.length;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["Order #", "Milestone title", "Description", "Date", "Cancel", "Save"])}
        </thead>
        <tbody>
          <tr>
            <td><input className="rounded form-control" type="number" ref={this.newMilestoneOrder} required={true} placeholder="Order #" defaultValue={order} /> </td>
            <td><textarea className="rounded form-control" rows={5} cols={50} ref={this.newMilestoneName} required={true} placeholder="Name" defaultValue={this.state.editMilestone && this.state.editMilestone.name} />  </td>
            <td className='text-center'><textarea className="rounded form-control" rows={5} cols={90} required={true} ref={this.newMilestoneDesc} placeholder="Description" defaultValue={this.state.editMilestone && this.state.editMilestone.description} /> </td>
            <td><DatePicker
              selected={this.state.startDate}
              onChange={this.handleDateChange} />
            </td>
            <td className='text-center'>
              <button id='milestone-cancel-edit' onClick={this.cancelEdit} className='button-icon py-1'>
                <FontAwesomeIcon icon={faTimesCircle} size='2x' />
              </button>
            </td>
            <td className='text-center'>
              <button id={`${order}-milestone-save-edit`} onClick={this.saveItem} className='button-icon py-1'>
                <FontAwesomeIcon icon={faCheckCircle} size='2x' />
              </button>
            </td>
          </tr>
        </tbody>
      </Table>
    )
  }

  private deleteListItem(e: any) {
    e.preventDefault()
    const listId = e.currentTarget.id;
    switch (true) {
      case listId.includes('milestone'):
        const { milestones: timeline } = this.state;
        timeline.splice(e.currentTarget.value, 1)
        this.setState({
          milestones: timeline,
          addMilestone: false,
          editMilestone: undefined
        })
        break;
      case listId.includes('budget'):
        let { budget, totalBudget, threshold } = this.state;
        const amountToTrash = budget[e.currentTarget.value] ? budget[e.currentTarget.value].amount : 0
        totalBudget = amountToTrash ? totalBudget - amountToTrash : totalBudget;
        threshold = threshold > totalBudget ? totalBudget : threshold;
        budget.splice(e.currentTarget.value, 1);
        this.setState({
          budget,
          totalBudget,
          threshold,
          addBudget: false,
          editBudget: undefined
        })
        break;
      default:
        break;
    }
  }

  private renderTableTimeline() {
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["#", "Project milestones", "Description", "Date", "Edit"])}
        </thead>
        <tbody>
          {this.state.milestones.map((item, indx) => {
            const startDate = item.start!.toLocaleString().split(',')[0];
            return (
              <tr key={indx}>
                <td>{indx}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{startDate}</td>
                <td className='text-center'>
                  <button value={indx} id={`milestone-${indx}`} className='button-icon py-2 px-2' onClick={this.deleteListItem}>
                    <FontAwesomeIcon icon={faTrashAlt} size='2x' />
                  </button>
                  <button id={`milestone-edit-${indx}`} value={indx} className='button-icon ml-2 px-1' onClick={this.handleEdit}>
                    <FontAwesomeIcon icon={faEdit} size='2x' />
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }
  private renderTableBudget() {
    const { budget, totalBudget } = this.state;
    return (
      <Table striped bordered hover responsive={true}>
        <thead>
          {this.tableHeader(["#", "Item", "Description", "Amount $US", "Amount EUR", "Edit"])}
        </thead>
        <tbody>
          {budget.map((item, indx) => {
            return (
              <tr key={indx}>
                <td>{indx}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.amount}</td>
                <td>{Math.round(item.amount! * 0.9 * 100) / 100}</td>
                <td className='text-center'>
                  <button value={indx} id={`budget-delete-item-${indx}`} className='button-icon py-2 px-2' onClick={this.deleteListItem}>
                    <FontAwesomeIcon icon={faTrashAlt} size='2x' />
                  </button>
                  <button id={`budget-edit-item-${indx}`} value={indx} className='button-icon ml-2 px-1' onClick={this.handleEdit}>
                    <FontAwesomeIcon icon={faEdit} size='2x' />
                  </button>
                </td>
              </tr>
            )
          })}
          <tr>
            <td>#</td>
            <td colSpan={2}><strong>Total budget required for this project</strong></td>
            <td><strong>{Math.round(totalBudget * 100) / 100}</strong></td>
            <td><strong>{Math.round((totalBudget * 0.9) * 100) / 100}</strong></td>
            <td></td>
          </tr>
        </tbody>
      </Table>
    )
  }

  private getRefValue(element: HTMLInputElement | null): string | undefined {
    if (element) {
      return element.value;
    }
    return;
  }

  private renderConclusion() {
    let { totalBudget, threshold } = this.state;
    threshold = threshold > totalBudget ? totalBudget : threshold;
    // const thresholdInEuro = this.thresholdBudget.current && this.thresholdBudget.current.value ? Number(this.thresholdBudget.current.value) * 0.9 : undefined;
    return (<div>
      <div className="form-row">
        <div className="form-group col-md-4">
          <label htmlFor='conclusion' className="font-weight-bold mt-3">
            Project execution threshold (local currency)</label>
          <input className="rounded form-control" type="number" ref={this.thresholdBudget}
            defaultValue={Math.round(threshold * 100) / 100}
            required={true} placeholder="Minimum amount from which you can guarantee that you will start the project" />
        </div>
        {/* <div className="form-group col-md-3 text-right">
          <label className="font-weight-bold mt-3">
            Threshold in EUR</label>
          <div className="text-right">{thresholdInEuro ? thresholdInEuro : Math.round((Number(threshold) * 0.9) * 100) / 100}</div>
        </div> */}
      </div>
      <div className="form-row">
        <div className="form-group col-md-12">
          <label className="font-weight-bold mt-1">
            Beware</label>
          <ul>
            <li>Past this threshold, you commit to start the project</li>
            <li>Under this threshold, any amount collected will be redestributed to the donors.</li>
          </ul>
          <div>
            <p>For example, with a project budget of 1000€:</p>
            <ul>
              <li>If you indicate a threshold of 1000€, it means that if we raise only 900€, the project will not proceed and the collected amount will be redistributed to the donors.</li>
              <li>If you indicate a threshold of 800€, you secure that the project will proceed as soon as we reach this amount. The campaign will stay online until the end of funding date, hopefully to gather the whole amount. If 900€ are raised, you need to guarantee that you have sufficient own funds to finalize the full project budget of 1000€, and the proejct will proceed. In this case, 100€ will need to come from your organization, and 900€ will come from the inPact community.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="form-row">
        <div className="form-group col-md-12">
          <label htmlFor='impact' className="font-weight-bold mt-3">
            Project impact</label>
          <p>People donating to the project will not always be familiar with the local realities surrounding the projects.
              Help them doing their donation by giving references related to your project.</p>
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 5 ?</div>
        </div>
        <div className="col-md-9">
          <input id="5-what-can-you-do" className="rounded form-control" type="text" 
            ref={this.whatWith5} required={false} placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith5}/>
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 10 ?</div>
        </div>
        <div className="col-md-9">
          <input id="10-what-can-you-do" className="rounded form-control" type="text" ref={this.whatWith10} required={false} 
            placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith10}/>
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 25 ?</div>
        </div>
        <div className="col-md-9">
          <input id="25-what-can-you-do" className="rounded form-control" type="text" ref={this.whatWith25} required={false} placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith25} />
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 100 ?</div>
        </div>
        <div className="col-md-9">
          <input id="100-what-can-you-do" className="rounded form-control" type="text" ref={this.whatWith100} required={false} placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith100} />
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 200 ?</div>
        </div>
        <div className="col-md-9">
          <input id="200-what-can-you-do" className="rounded form-control" type="text" ref={this.whatWith200} required={false} placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith200} />
        </div>
      </div>
      <div className="form-row mt-2">
        <div className="col-md-3">
          <div>What can you do with € 500 ?</div>
        </div>
        <div className="col-md-9">
          <input id="500-what-can-you-do" className="rounded form-control" type="text" ref={this.whatWith500} required={false} placeholder="e.g. Buy school supplies for 5 children" defaultValue={this.state.whatWith500} />
        </div>
      </div>

    </div>)
  }

  private saveCampaign() {
    // TODO: Send saved state to backend
    this.setState({
      saved: true,
      whatWith5: this.getRefValue(this.whatWith5.current) || '',
      whatWith10: this.getRefValue(this.whatWith10.current) || '',
      whatWith25: this.getRefValue(this.whatWith25.current) || '',
      whatWith100: this.getRefValue(this.whatWith100.current) || '',
      whatWith200: this.getRefValue(this.whatWith200.current) || '',
      whatWith500: this.getRefValue(this.whatWith500.current) || '',
      threshold: Number(this.getRefValue(this.thresholdBudget.current)) || 0,
    })
    setTimeout(() => console.log('save state in backend', this.state), 1000)
  }

  private handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // TODO: send completed form to backend and redirect to project page to view
  }

  private renderForm() {
    if (this.props && this.props.loggedIn) {
      return (
        <form onSubmit={this.handleSubmit}>

          <div id="my-inpact" className="py-5 my-3 px-3 white-section">
            <div className="row text-right pt-3 ">
              <div className="col fixed-campaign-buttons">
                <input type='button' className={(this.state.saved ? "btn btn-secondary" : "btn btn-primary") + " px-5 mx-3"} value={this.state.saved ? "Saved" : "Save!"} onClick={this.saveCampaign} />
                <input type="submit" className="btn btn-success px-5 mx-3" value="Submit" />
              </div>
            </div>
            {/* Basic information */}
            <div className="container-fluid border rounded py-3 my-3 project-basic-info">
              <h2 className="dark-gray-text px-3 pt-3">Basic information</h2>
              <div className="row px-3">
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='project-title' className="font-weight-bold">
                    Project Title</label>
                  <input id="project-title" className="rounded form-control" type="text" ref={this.projectTitle} required={true} placeholder="Project Title" defaultValue={this.state.projectTitle} />
                  {this.renderCategories()}
                  {this.renderSelectedItemsSections('categories')}
                  <div>
                    <label htmlFor='other-categories' className="font-weight-bold mt-3">
                      Other categories</label>
                    <input id="other-categories" className="rounded form-control" type="text" ref={this.addCategory} required={false} placeholder="Other categories" />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddCategory}>Add</Button>
                  </div>
                  {/* <div>
                    <label htmlFor='total-budget' className="font-weight-bold mt-3">
                      Total budget</label>
                    <input id="total-budget" ref={this.totalBudget} defaultValue={this.state.totalBudget} type="number" required={false} className="rounded form-control" placeholder="Total budget" />
                  </div> */}
                </div>
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='short-description' className="font-weight-bold">
                    Short description (max 125 characters)</label>
                  <input id="short-description" className="rounded form-control" type="text" maxLength={160} ref={this.shortDescription} required={true} placeholder="Your goal in little less than 25 words..." defaultValue={this.state.shortDescription} />
                  <label htmlFor='summary' className="font-weight-bold mt-3">
                    Summary (max 1000 characters)</label>
                  <textarea id="input-summary" className="rounded form-control" rows={17} cols={80} maxLength={1000}
                    ref={this.summary} required={false} placeholder="Tell us a bit about your project..." />
                </div>
              </div>
            </div>
            {/* Details */}
            <div className="container-fluid border rounded py-3 my-3 ">
              <h2 className="dark-gray-text px-3 pt-3">Project details</h2>
              <div className="row px-3">
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='background' className="font-weight-bold mt-3">
                    Background and context</label>
                  <textarea id="background" className="rounded form-control" rows={17} cols={80} ref={this.background} required={false} placeholder="Tell the community more about the background of the project and the history behind and how you came up with this project." />
                  <label htmlFor='detailed-description' className="font-weight-bold mt-3">
                    Detailed project description</label>
                  <textarea id="detailed-description" className="rounded form-control" rows={17} cols={80} ref={this.detailedDescription} required={false} placeholder="Tell the community more about tinformation about the project. For example, what do you aim to do? What do you want to achieve?" />
                  <label htmlFor='project-impact' className="font-weight-bold mt-3">
                    Project impact</label>
                  <textarea id="project-impact" className="rounded form-control" rows={7} cols={80} ref={this.projectImpact} required={false} placeholder="Tell the community what will be the impact of your project on the community you work in." />
                </div>
                <div className="col-lg-6 pt-3 px-3">
                  <label htmlFor='location' className="font-weight-bold mt-3">
                    Location</label>
                  <input id="location" className="rounded form-control" type="text" required={false} placeholder="Location" defaultValue={''} />
                  <label htmlFor='organization-name' className="font-weight-bold mt-3">
                    Your organization's name </label>
                  <input id="organization-name" className="rounded form-control" type="text" required={false} ref={this.organizationName} placeholder="Title of your organization" />
                  <label htmlFor='organization-description' className="font-weight-bold mt-3">
                    Organization's description </label>
                  <textarea id="organization-description" className="rounded form-control" rows={7} cols={80} required={false} ref={this.organizationDescription} placeholder="Describe your organisation and your competences for this project. What makes you the a great local partner to conduct this project?" />
                  <label htmlFor='organization-website' className="font-weight-bold mt-3">
                    Organization's website </label>
                  <input id="organization-website" className="rounded form-control" type="text" required={false} ref={this.organizationWebsite} placeholder="Website, Facebook or any other social media site" />
                  <div>
                    {this.renderSelectedItemsSections('admins')}
                    <input id="project-administrators" className="rounded form-control mt-3" type="text" ref={this.addAdmins} required={false} placeholder="Admin's email, which will be able to edit." />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddAdmins}>Add</Button>
                  </div>
                  <div>
                    {this.renderSelectedItemsSections('ambassadors')}
                    <input id="project-ambassadors" className="rounded form-control mt-3" type="text" ref={this.addAmbassadors} required={false} placeholder="Ambassador's email, which will defend this project." />
                    <Button className="btn btn-primary mt-2" onClick={this.handleAddAmbassadors}>Add</Button>
                  </div>
                </div>
              </div>
              {/* Timeline */}
              <div className="row px-3">
                <div className="col-lg-12 pt-3 px-3">
                  <label htmlFor='timeline' className="font-weight-bold mt-3">
                    Timeline</label>
                  {this.renderTableTimeline()}
                  <div className="text-right my-2">
                    <Button id='milestone-new-green'
                      variant={this.state.addMilestone || this.state.editMilestone!! ? "secondary" : "success"}
                      value={undefined}
                      onClick={this.state.addMilestone || this.state.editMilestone!! ? this.cancelEdit : this.enterNewItem}>
                      {this.state.addMilestone || this.state.editMilestone!! ? "Cancel" : "Enter new milestone"}
                    </Button>
                  </div>
                  {this.state.addMilestone ? this.renderNewMilestone() : undefined}
                  {this.state.editMilestone ? this.renderEditMilestone("milestone") : undefined}
                </div>
              </div>
              {/* Budget */}
              <div className="row px-3">
                <div className="col-lg-12 pt-3 px-3">
                  <label htmlFor='timeline' className="font-weight-bold mt-3">
                    Budget</label>
                  {this.renderTableBudget()}
                  <div className="text-right my-2">
                    <Button
                      id="budget-new-green"
                      variant={this.state.addBudget || this.state.editBudget!! ? "secondary" : "success"}
                      value={undefined}
                      onClick={this.state.addBudget || this.state.editBudget!! ? this.cancelEdit : this.enterNewItem}>
                      {this.state.addBudget || this.state.editBudget!! ? "Cancel" : "Enter new budget item"}
                    </Button>
                  </div>
                  {this.state.addBudget ? this.renderNewBudget() : undefined}
                  {this.state.editBudget ? this.renderEditBudget() : undefined}
                </div>
              </div>
              {/* Conclusion */}
              <div className="row px-3">
                <div className="col-lg-12 pt-3 px-3">
                  {this.renderConclusion()}
                </div>
              </div>
            </div>
          </div>
        </form>
      )
    }
    return <Redirect to='/login' />
  }

  public render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}