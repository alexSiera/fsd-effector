import { fork, allSettled } from "effector";
import { initAnalyticsFx, sendDataToAnalytics, sendEventFx } from "./analytics";
import { AnalyticsEventTypes } from "../../shared/types/analytics";

describe("analytics", () => {
  test("should send events immidiatly", async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: AnalyticsEventTypes.FORM_SHOWN, payload: {} };

    const scope = fork({
      // Список хэндлеров эвентов которые мы хотим подменить в этом скоупе
      // Пара [mockEffect, mockRealisation]
      handlers: new Map<any, any>([
        [initAnalyticsFx, jest.fn()],
        [sendEventFx, sendEventMock],
      ]),
    });
    // init analytics
    // Run effect in scope and wait for all triggered effects to settle. This method never throw an error
    // Если initAnalyticsFx будет вызывавать другие эффекты то эта функция дождется конца всех порожденных ивентов
    await allSettled(initAnalyticsFx, { scope });
    // send event
    await allSettled(sendDataToAnalytics, {
      scope,
      params: TEST_EVENT,
    });
    // check event sent
    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });

  test("should send events only after initializtion", async () => {
    const sendEventMock = jest.fn();

    const TEST_EVENT = { name: AnalyticsEventTypes.FORM_SHOWN, payload: {} };

    const scope = fork({
      handlers: new Map<any, any>([
        [initAnalyticsFx, jest.fn()],
        [sendEventFx, sendEventMock],
      ]),
    });

    await allSettled(sendDataToAnalytics, {
      scope,
      params: TEST_EVENT,
    });

    expect(sendEventMock).not.toHaveBeenCalled();

    await allSettled(initAnalyticsFx, { scope });

    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);

    await allSettled(initAnalyticsFx, { scope });

    expect(sendEventMock).toHaveBeenCalledTimes(1);
    expect(sendEventMock).toHaveBeenCalledWith(TEST_EVENT);
  });
});
