const { Builder, By, until, Key } = require('selenium-webdriver');
require('chromedriver');

(async function comprehensiveTest() {
  let driver = await new Builder().forBrowser('chrome').build();

  try {
    // Open the local development server URL on port 5173 (as per Vite output)
    const url = 'http://localhost:5173';
    await driver.get(url);

    // Wait for the page title
    await driver.wait(until.titleIs('TaskFlow - Task Management App'), 5000);

    // Add a new task
    await driver.findElement(By.id('title')).sendKeys('Test Task');
    await driver.findElement(By.id('description')).sendKeys('This is a test task description.');
    await driver.findElement(By.id('dueDate')).sendKeys('2024-12-31');
    await driver.findElement(By.id('priority')).sendKeys('High');
    // Add a tag
    await driver.findElement(By.xpath("//button[contains(text(),'Add Tag')]")).click();
    const tagInput = await driver.findElement(By.css('input[placeholder="Enter tag name"]'));
    await tagInput.sendKeys('testtag', Key.RETURN);

    // Submit the form
    await driver.findElement(By.xpath("//button[contains(text(),'Add Task')]")).click();

    // Wait for the task to appear in the list
    await driver.wait(until.elementLocated(By.xpath("//h3[contains(text(),'Test Task')]")), 5000);

    // Verify task title is displayed
    const taskTitle = await driver.findElement(By.xpath("//h3[contains(text(),'Test Task')]")).getText();
    console.log('Task added with title:', taskTitle);

    // Toggle task completion
    const toggleButton = await driver.findElement(By.xpath("//h3[contains(text(),'Test Task')]/preceding::button[1]"));
    await toggleButton.click();

    // Delete the task
    const deleteButton = await driver.findElement(By.xpath("//h3[contains(text(),'Test Task')]/following::button[@aria-label='Delete task']"));
    await deleteButton.click();

    // Verify task is removed
    await driver.wait(async () => {
      const tasks = await driver.findElements(By.xpath("//h3[contains(text(),'Test Task')]"));
      return tasks.length === 0;
    }, 5000);

    console.log('Task deleted successfully.');

  } finally {
    await driver.quit();
  }
})();
