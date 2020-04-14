import * as React from 'react';
import { Card, Button, Container, Row, ProgressBar } from 'react-bootstrap';
import * as UsersAPI from '../utils/UsersAPI'
import { IProfileProps, ICampaingsState } from '../domain/types';
import { Link } from 'react-router-dom';

export default class Campaigns extends React.Component<IProfileProps, ICampaingsState> {

    constructor(props: IProfileProps) {
        super(props);
        this.state = {
            campaigns: []
        }
        this.loadCampaigns = this.loadCampaigns.bind(this)
    }

    public async componentDidMount() {
        const user = this.props
        const campaigns = await UsersAPI.postEndpoint(user, 'get-campaigns')
        this.setState({ campaigns })
    }

    public card = (id: number,title: string, description: string, image: string, stage: string, funding: any, timeline: any) => {
        if (stage === "funding") {
            const progress = Math.round((funding.raised/funding.goal)*100)
            const raised = Math.round(funding.raised)
            return (
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                    </Card.Text>
                    </Card.Body>
                    <Card.Body className="text-center">
                    <ProgressBar animated variant="success" className="my-2" now={progress} label={`${progress}%`} />
                        <Card.Text >
                                {`${raised} of ${funding.goal} ${funding.currency}`}
                        </Card.Text>
                        <Button className="mr-2" variant="success">Donate</Button>
                        <Link to={`/projects/${id}`}>
                            <Button variant="info">Go to campaign</Button>
                        </Link>
                        {/*  */}
                    </Card.Body>
                    <Card.Footer className="text-muted text-center">
                        {/* Try SVGs: https://blog.lftechnology.com/using-svg-icons-components-in-react-44fbe8e5f91 */}
                        {/* <Card.Img variant="top" src="../assets/icons/047-idea.svg" /> */}

                        {`${timeline.remainingDays} days remaining`}
                    </Card.Footer>
                </Card>
            )
        } else  { 
            return (
                <Card style={{ width: '20rem' }}>
                    <Card.Img variant="top" src={image} />
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text>
                            {description}
                    </Card.Text>
                        <Button variant={stage === "ongoing" ? "primary" : "secondary" }>Go to project</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                </Card>
            )
        }
    }

    public loadItems(items: any[], heading: string, color: string) {
        if (items.length > 0) {
            return (
                <div>
                    <h3 className="mt-3">{heading}</h3>
                    <hr className={color}/>
                    <Row>
                        {items}
                    </Row>
                </div>
            )
        }
    }

    public loadCampaigns() {
        const { campaigns } = this.state
        if (campaigns.length > 0) {
            // Build list items from stored campaigns
            const fundingItems = campaigns.map((c) => {
                if (c.stage === "funding") {
                    return (<div key={c.id.toString()} className="my-3 mx-3">
                        {this.card(c.id, c.title, c.description, c.image, c.stage, c.funding, c.timeline)}
                    </div>)}
                return undefined;
            })
            const ongoingItems = campaigns.map((c) => {
                if (c.stage === "ongoing") {
                    return (<div key={c.id.toString()} className="my-3 mx-3">
                        {this.card(c.id, c.title, c.description, c.image, c.stage, c.funding, c.timeline)}
                    </div>)}
                return undefined;
            })
            const archivedItems = campaigns.map((c) => {
                if (c.stage === "archived") {
                    return (<div key={c.id.toString()} className="my-3 mx-3">
                        {this.card(c.id, c.title, c.description, c.image, c.stage, c.funding, c.timeline)}
                    </div>)}
                return undefined;
            })
            return (
            <Container>
                {this.loadItems(fundingItems, 'Projects under review and funding', 'my-success')}
                {this.loadItems(ongoingItems, 'Ongoing projects', 'my-primary')}
                {this.loadItems(archivedItems, 'Archived projects', 'my-secondary')}
            </Container>)
        } else {
            // No campaigns found, load default image
            return (
                <div>
                    <img src={require('../assets/icons/NoCampaign.png')} alt='' />
                    <p>No campaigns added yet!</p>
                </div>
            )
        }
    }


    public render() {
        return (
            <div>
                <div>
                    <Link to='/project-submission'>
                        <Button variant="success" size="lg" className="mt-3" block>
                            Add new campaign!
                        </Button>
                    </Link>
                </div>
                <div>{this.loadCampaigns()}</div>
            </div>
        );
    }
}