---
title: Getting Started with Prefect - A Complete Guide to Task Orchestration
date: 2024-03-22
tags: [technical, data-engineering, prefect, python, orchestration]
description: A comprehensive guide to getting started with Prefect for task orchestration, including setup, flows, tasks, deployments, and cloud integration
image_path: images/blog/prefect-workflow.webp
---
![Prefect Workflow Overview](images/blog/prefect-workflow.webp)

## What is Prefect?

Many data teams face a significant hurdle when it comes to coordinating the various tools in their data infrastructure. Fortunately, specific tools exist to tackle this issue (task orchestration), and make our lives as data engineers easier. 

In this blog post, I will introduce you to Prefect, an open-source task orchestration solution designed for data and ML engineers. Prefect empowers developers to build, observe, and react to data pipelines. With Prefect, you can easily transform your Python functions into tasks that can be observed and orchestrated.

Prefect offers a user-friendly interface and is specifically designed for data-related tasks. It provides a simple and centralized way to manage and monitor your entire stack. By adding a few decorators to your Python code, you can turn your functions into Prefect tasks and seamlessly integrate them into your workflows. Prefect is accessible to developers with basic Python proficiency, making it easy to get started with orchestrating your data pipelines.

## Github Repo:
Discover the examples I utilized in this [GitHub link](https://github.com/DineshGuduru/prefect-demo).

## Installing Prefect:
Open an IDE of your choice and create a new project named prefect-demo
Prefect is built around python and requires Python 3.7 or later, so just make sure that you have python and I recommend installing in virtual environment.
Select Python as language and Virtualenv as Python environment type.

![Create IntelliJ Project](images/blog/create-project-intellij.png)

After creating the project, you will see the below screen. Open the terminal inside the IDE and (venv) appears which means that virtual environment named venv is created and activated.

![IntelliJ Terminal](images/blog/intellij-terminal.png)

If you face any issue with virtual environment from the IDE, You may also run below commands to create and activate virtual environment named prefect-venv using venv.

Note: This step is not required if you are already in venv as shown in above screenshot.

```bash
python3 -m venv prefect-venv
source prefect-venv/bin/activate
```

To install Prefect all we need to do is run a pip install prefect in the IDE Terminal. After installation you may run prefect version to check the installation.

```bash
pip install prefect
```

Verify installation:
```bash
prefect version
```

![Prefect Version](images/blog/prefect-version.png)

We can see prefect installed and everything looks good so at this point technically prefect is ready to start using.
You can run a command prefect server start to start prefect locally.

```bash
prefect server start
```

![Prefect Server Start](images/blog/prefect-start.png)

It spins up a nice UI that we’re ready to use and monitor everything that we would build now.

![Prefect UI](images/blog/prefect-ui.png)

## Create a Python Script:
Let’s now create a simple python script just to see different components in action. Just create a simple file called hello_world.py with below code.

```python
def hello_world():
    print("Hello World!")

if __name__ == '__main__':
    hello_world()
```

![Hello World](images/blog/hello-world.png)

To make sure this is a running python script, just run python3 hello_world.py and we should be able to see Hello World! printed out

![Run Hello World](images/blog/run-hello-world.png)

## Core Concepts

### 1. Flows

Flows are the basic building blocks in Prefect, essentially you’re just going to wrap your code using a at flow decorator. Now let’s implement prefect stuff starting withe flow decorator that will make this hello_world method as a prefect flow. Just import flow from prefect and add @flow just above function definition as shown below.

```python
from prefect import flow

@flow
def hello_world():
    print("Hello World!")

if __name__ == "__main__":
    hello_world()
```

Now run the same python3 hello_world.py and see the script executing as a prefect flow rather than just a python script

![Hello World Prefect](images/blog/hello-world-prefect.png)

Refresh the prefect UI and you should be able to see the flow showing up in the UI.

![Hello World Prefect UI](images/blog/hello-world-prefect-ui.png)

### 2. Tasks

Tasks are individual units of work within a flow:

Now Let’s add a task to the flow. Just create a new function called message() and return some message to print in the console. And instead of printing Hello World! directly, read the message from the task from the flow and print the message in the flow as shown in the below code.

```python
from prefect import flow, task

@task
def get_message():
    return "Hello from Prefect!"

@flow
def hello_world():
    message = get_message()
    print(message)

if __name__ == '__main__':
    hello_world()
```

Execute the code using python3 hello_world.py and observe the flow getting created with a task which is not there in the previous run.

![Prefect Task](images/blog/prefect-task.png)

The same will be displayed in the UI as well as shown below.

![Prefect Task UI](images/blog/prefect-task-ui.png)

### 3. SubFlows

You can create hierarchical workflows using subflows:

Now that we have a task and a flow, we can also create sub flow inside a flow. Adding a sub flow is very similar to adding a task, but instead of using task decorator, we use the flow decorator and call one flow (sub flow) from the other flow. Here is the simple code to implement sub flow.

```python
from prefect import flow, task

@task
def message():
    return "Hello World!"

@flow
def welcome():
    return "Welcome!"

@flow
def hello_world():
    msg = message()
    welcome_msg = welcome()
    print(msg + " " + welcome_msg)

if __name__ == '__main__':
    hello_world()
```

We can see the flow, task and subflow created on running the above code.

![Prefect Subflow](images/blog/prefect-subflow.png)

Same can be seen in the UI as well.

![Prefect Subflow UI](images/blog/prefect-subflow-ui.png)

And we can also see it added as a separate flow in the tab Flows.

![Prefect Subflow UI Tab](images/blog/prefect-subflow-ui-tab.png)


## Intro to Deployments

One of the most common reasons to use a tool like Prefect is scheduling or event-based triggering. Up to this point, we’ve demonstrated running Prefect flows as scripts, but this means you have been the one triggering and managing flow runs. You can certainly continue to trigger your workflows in this way and use Prefect as a monitoring layer for other schedulers or systems, but you will miss out on many of the other benefits and features that Prefect offers.
Deploying a flow exposes an API and UI so that you can:
- Trigger new runs, cancel active runs, pause scheduled runs, customize parameters, and more
- Remotely configure schedules and automation rules for your deployments
- Dynamically provision infrastructure using workers

### What is a deployment?

Deploying a flow is the act of specifying when, where, and how it will run. This information is encapsulated and sent to Prefect as a deployment that contains the crucial metadata needed for remote orchestration. Deployments elevate workflows from functions that you call manually to API-managed entities.

Attributes of a deployment include (but are not limited to):

- **Flow entrypoint:** Path to your flow function (e.g., `hello_world.py:hello_world`)
- **Schedule or Trigger:** (Optional) Schedule or triggering rule for this deployment
- **Tags:** (Optional) Text labels for organizing your deployments
- Creating a deployment is a two-step process:

### Creating a Deployment

1. Build the deployment:
```bash
prefect deployment build hello_world.py:hello_world -n demo-deployment
```

Argument -n specifies the name of the deployment and the above command will create the file named hello_world-deployment.yaml that is going to be yaml file.

![Build Deployment](images/blog/build-deployment.png)

We’ll build here and this file gets stored on the prefect API server as a deployment so you create the definition and then you push that definition to this server right now the server for us is our local host but you could also use prefect Cloud for this same purpose within a deployment.

2. Apply the deployment:
```bash
prefect deployment apply hello_world-deployment.yaml
```

![Apply Deployment](images/blog/apply-deployment.png)

The deployment would now appear in the prefect UI under Deployments tab. And from the UI anyone can trigger the run and the flow will run once the agent is started in the infrastructure, in this case local machine.

![Apply Deployment UI](images/blog/apply-deployment-ui.png)

There’s a lot of configurations but two of the most important ones are storage and infrastructure.
Storage represents where does this code
file exist ( local machine or Cloud Server or S3 bucket or a GitHub repository) and where should it look for the code.
Infrastructure is how is this going to run. For example, is it just on your local machine or are you running this in a Docker container in a virtual machine.
You can indicate this here and the agent is a small polling service that’s going tobe constantly checking in with the API to see if there’s work for it to do.
To understand this a bit more, Click on the 3 dots on the deployment and select quick run. The run would be scheduled and as soon as agent finds the flow.

![Deployments UI](images/blog/deployments-ui.png)

### Starting an Agent

Now we need to have our agent running in some infrastructure, In our case let’s start the agent in the local machine using below command and observe the agent picking up the flow and running in the local machine.

```bash
prefect agent start -q 'default'
```

We mentioned the queue as default as the queue name is default in the deployment file that we just created. We may also change the name of the queue as per our requirements.

![Prefect Agent](images/blog/prefect-agent.png)

And by clicking on the deployment in the dashboard, It will display all the flow runs using the deployment.

![Prefect Deployment Run](images/blog/prefect-deployment-run.png)

Work Pools tab lets you to edit the pools, add new pools, set and modify the concurrency of a particular work pool.

## Prefect Cloud

While local development is great for getting started, Prefect Cloud offers several advantages:
- No need to host your own server
- Built-in authentication and security
- Team collaboration features
- Workspace management
- Built-in automations and connectivity

![Prefect Cloud](images/blog/prefect-cloud.png)

### Setting Up Prefect Cloud

1. Sign up at prefect.io

![Prefect Signup](images/blog/prefect-signup.png)

2. Create a workspace

To get started with Prefect Cloud, visit prefect.io and click on “Get Started”. Enter your email address, and you will receive a link to sign in. You can either use your Google or Microsoft account to sign up. Once you are logged in, you will be in Prefect Cloud. The first step is to create a workspace, which will default to your owner name. Give it a name, such as “demo-org”.

![Prefect Workspace](images/blog/prefect-workspace.png)

3. Connect your local environment:

The view in the workspace is similar to what we had locally. However, we need to ensure that our local terminal connects to this workspace as our API and backend, instead of the current setup. Thankfully, Prefect makes this process easy. Simply run a single command in our editor, and our flows and operations will run on the cloud service.

```bash
prefect cloud login
```

To authenticate with Prefect Cloud, you can use the command “prefect cloud login”. This command will present you with two options: logging in with a web browser or pasting an API key. Since we don’t have an API key yet, we can choose to log in with a web browser.

![Prefect Cloud Login](images/blog/prefect-cloud-login.png)

After selecting this option, an authentication window will appear. Go ahead and authorize the login. Once the window is closed, you will see that you are now authorized using your workspace.

![Prefect Cloud Auth](images/blog/prefect-cloud-auth.png)

![Prefect Cloud Auth Success](images/blog/prefect-cloud-auth-success.png)

![Prefect Cloud Login CLI](images/blog/prefect-cloud-login-cli.png)

Now, we are ready to start using Prefect with the cloud as our backend. To demonstrate that the connection is working, you can run your script again. Previously, it was running on our local server, but now the information should show up in our Prefect Cloud account. Upon refreshing the page, you will see that both runs are displayed in the cloud. Additionally, if you navigate to the deployments section, you will find your deployment script. This highlights the separation of concepts, where the deployment definition was initially on our local backend, but now it needs to be transferred to the Cloud API backend. By rerunning the apply command, the deployment will be applied to our cloud environment. The UI will reflect this change, and you can access the deployment directly.

![Prefect Deploy to Cloud](images/blog/deploy-to-cloud.png)

![Prefect Deploy to Cloud](images/blog/deploy-to-cloud-ui.png)

It’s important to note that even though we are running the script locally, the agent is being executed by Prefect in the cloud. This demonstrates how all the connections work together seamlessly.

## Working with Blocks

Blocks provide secure storage for:
- Credentials
- Configurations
- Integration settings

### Example: Using a String Block

```python
from prefect.blocks.system import String

block = String.load("whoami")
message = block.value
print(f"Message from block: {message}")
```

## Version Control and GitHub Integration

Prefect integrates seamlessly with GitHub for version control:

1. Create a GitHub block in Prefect UI
2. Configure with repository URL and access token
3. Update deployment to use GitHub storage:
```bash
prefect deployment build hello_world.py:hello_world -n "demo-github-deployment" -sb github/prefect-repo
```

## Best Practices

### Organization:
   - Use meaningful names for flows and tasks
   - Group related tasks into subflows
   - Leverage tags for better organization

### Security:
   - Use blocks for sensitive information
   - Never hardcode credentials
   - Implement proper access controls in cloud deployments

### Monitoring:
   - Set up notifications for task failures
   - Configure appropriate logging levels
   - Use tags for filtering and monitoring

## Conclusion

Prefect offers a robust solution for task orchestration that's both powerful and developer-friendly. Whether you're managing simple data pipelines or complex ML workflows, Prefect's features and flexibility make it an excellent choice for modern data teams.

For more examples and detailed documentation, check out the [official Prefect documentation](https://docs.prefect.io/).

---

*Note: The code examples in this post are simplified for demonstration purposes. In production environments, you'll want to add proper error handling and logging.* 