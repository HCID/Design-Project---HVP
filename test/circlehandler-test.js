buster.testCase("Click handler", {
    "communities": {
      "should return false when list is empty and communites are empty": function () {
          refute(ClickHandler.filterCommunitieClick([], []));
      },
      "should return false when list is empty and communites has an element": function () {
          refute(ClickHandler.filterCommunitieClick([], ["ux"]));
      },
      "should return false when list is empty and communites has multiple elements": function () {
          refute(ClickHandler.filterCommunitieClick([], ["ux", "design"]));
      },
      "should return true when list has an element and communites has the same": function () {
          assert(ClickHandler.filterCommunitieClick(["ux"], ["ux"]));
      },
      "should return false when list has an element and communites has none": function () {
          refute(ClickHandler.filterCommunitieClick(["ux"], []));
      },
      "should return false when list has an element and communites has the same and another one": function () {
          refute(ClickHandler.filterCommunitieClick(["ux"], ["ux", "design"]));
      },
      "should return false when list has an element and communites has two different ones": function () {
          refute(ClickHandler.filterCommunitieClick(["ux"], ["health", "design"]));
      },
      "should return true when list has two elements and communites has the same ones (in the same order)": function () {
          assert(ClickHandler.filterCommunitieClick(["ux", "health"], ["ux", "health"]));
      },
      "should return true when list has two elements and communites has the same ones (in different order)": function () {
          assert(ClickHandler.filterCommunitieClick(["ux", "health"], ["health", "ux"]));
      },
      "should return false when list has two elements and communites is empty": function () {
          refute(ClickHandler.filterCommunitieClick(["ux", "health"], []));
      },
      "should return true when list is N/A and communites are empty": function () {
          assert(ClickHandler.filterCommunitieClick(["N/A"], []));
      },
      "should return false when list is N/A and communites are ux": function () {
          refute(ClickHandler.filterCommunitieClick(["N/A"], ["ux"]));
      },
      "should return false when list is N/A and communites are ux and design": function () {
          refute(ClickHandler.filterCommunitieClick(["N/A"], ["ux", "design"]));
      },
      "should return false when list is N/A and health while communites is health": function () {
          refute(ClickHandler.filterCommunitieClick(["N/A", "health"] , ["health"]));
      },
      "should return false when list is N/A and health while communites is empty": function () {
          refute(ClickHandler.filterCommunitieClick(["N/A", "health"] , []));
      }

      


    }
    

})