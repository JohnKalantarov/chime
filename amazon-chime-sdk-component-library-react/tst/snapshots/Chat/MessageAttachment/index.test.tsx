// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

describe('MessageAttachment', () => {
  it('visually looks correct', async () => {
    await page.goto(
      'http://host.docker.internal:9009/iframe.html?id=ui-components-chat-messageattachment--message-attachment'
    );

    const image = await page.screenshot();
    expect(image).toMatchImageSnapshot();
  });
});
