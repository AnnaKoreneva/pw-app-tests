import { fixtures as test } from '../../fixture';

test('drag and drop', async ({ dragAndDropPage }) => {
  await dragAndDropPage.navigateToDragAndDrop();
  await dragAndDropPage.dragAndDropImage();
  await dragAndDropPage.dragAndDropMouse();
  await dragAndDropPage.checkIsImagesInTrash();
});
