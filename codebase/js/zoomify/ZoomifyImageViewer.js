//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// Copyright Zoomify, Inc., 1999-2012. All rights reserved.
// You may use this file on private and public websites, for personal and commercial
// purposes, with or without modifications, so long as this notice is included. Redistribution
// via other means is not permitted without prior permission. Additional terms apply.
// For complete license terms please see the Zoomify License Agreement included with
// this product and available on the Zoomify website at www.zoomify.com.
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

// Zoomify Image Viewer v1.8.8

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::


// The functions below are listed in groups in the following order: Initialization, ZoomifyImageViewer,
// ZoomifyViewport, ZoomifyToolbar, ZoomifyNavigator, NetConnector, and Utils.  Within each
// group the functions appear in the order in which they are first called.  Each group serves as a
// component with its own global variables and functions for sizing, positioning, and interaction.
// Shared variables global at the scope of the Zoomify Image Viewer are declared in a single 'Z'
// object which provides easy access while preventing naming conflicts with other code sources.



(function () {
	// Declare global-to-page object to contain global-to-viewer elements.
	var global = (function () { return this; } ).call();
	global.Z = {};
})();



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::: INIT FUNCTIONS :::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.showImage = function (containerID, imagePath, optionalParams) {
	// Ensure needed browser functions exist.
	Z.Utils.addCrossBrowserPrototypes();
	Z.Utils.addCrossBrowserMethods();
	Z.Utils.addCrossBrowserEvents();

	// Declare all global variables in one global object and get web page parameters.
	Z.Utils.declareGlobals();
	Z.pageContainerID = containerID;

	Z.imagePath = Z.Utils.removeTrailingSlashCharacters(imagePath);
	Z.parameters = Z.Utils.parseParameters(optionalParams);

	// Initialize on content load rather than full page load if supported by browser.
	Z.Utils.addEventListener(document, "DOMContentLoaded", Z.initialize);
	Z.Utils.addEventListener(window, "load", Z.initialize);
};

Z.initialize = function () {
	if (!arguments.callee.done) {
		// Ensure initialization occurs only once.
		arguments.callee.done = true;

		// Get browser, parse web page parameters, and create Zoomify Viewer.
		Z.Utils.detectBrowserInfo();
		Z.Utils.setParameters(Z.parameters);
		Z.Viewer = new Z.ZoomifyImageViewer();

		// Display copyright text for user confirmation, if optional parameter present.
		if (!(Z.Utils.isStrVal(Z.copyrightPath))) {
			Z.Viewer.configureViewer();
		} else {
			Z.Utils.enforceCopyright();
		}

		// If in any debug mode, present basic debugging features (trace panel, globals dialog).
		if (Z.debug != 0) { Z.Utils.trace(Z.Utils.getResource("DEFAULT_TRACEDISPLAYDEBUGINFOTEXT")); }
	}
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::: VIEWER FUNCTIONS :::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.ZoomifyImageViewer = function () {
	// Create Viewer display area as application environment for Viewport, Toolbar and Navigator.
	Z.ViewerDisplay = Z.Utils.createContainerElement("div", "ViewerDisplay", "inline-block", "relative", "hidden", "100%", "100%", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", "pointer");
	Z.pageContainer = document.getElementById(Z.pageContainerID);
	
	var containerS = Z.Utils.getElementStyle(Z.pageContainer);
	Z.viewerW = parseFloat(containerS.width);
	Z.viewerH = parseFloat(containerS.height);
	if (isNaN(Z.viewerW)) { Z.viewerW = Z.ViewerDisplay.clientWidth; }
	if (isNaN(Z.viewerH)) { Z.viewerH = Z.ViewerDisplay.clientHeight; }
	
	Z.pageContainer.innerHTML = "";
	Z.pageContainer.appendChild(Z.ViewerDisplay);

	// Create Viewport.
	this.configureViewer = function () { Z.Viewport = new Z.ZoomifyViewport(); };

	// Create Toolbar and Navigator.
	this.configureComponents = function () {
		if (Z.toolbarVisible > 0) { Z.Toolbar = new Z.ZoomifyToolbar(Z.Viewport); }
		if (Z.navigatorVisible > 0) { Z.Navigator = new Z.ZoomifyNavigator(Z.Viewport); }
		if (Z.Navigator) { Z.Navigator.validateNavigatorGlobals(); }
	};
	
	this.setSizeAndPosition = function (width, height, left, top, update) {
		Z.viewerW = width;
		Z.viewerH = height;
		Z.ViewerDisplay.style.width = width + "px";
		Z.ViewerDisplay.style.height = height + "px";
		if (Z.Viewport && Z.Viewport.getInitialized()) { Z.Viewport.setSizeAndPosition(width, height, left, top); }
		var toolbarTop = (Z.toolbarPosition == 1) ? height - Z.toolbarH : 0;
		if (Z.ToolbarDisplay && Z.Toolbar.getInitialized()) { 
			Z.Toolbar.setSizeAndPosition(width, null, null, toolbarTop); 
			if (Z.toolbarVisible > 1) { Z.Toolbar.show(true); }
		}
		if (Z.NavigatorDisplay && Z.Navigator.getInitialized()) { 
			Z.Navigator.setSizeAndPosition(null, null, left, top, Z.navigatorFit); 
			if (Z.navigatorVisible > 1) { Z.Navigator.setVisibility(true); }
		}
		if (update) { Z.Viewport.updateView(true); }
	};
	
	this.setImagePath = function (imagePath, imageProperties) {
		if (Z.Viewport && Z.Viewport.getInitialized()) { 
			Z.Viewport.zoomAndPanAllStop(true); 
			Z.imagePath = Z.Utils.removeTrailingSlashCharacters(imagePath);
			if (imageProperties == null) {
				var netConnector = new Z.NetConnector();
				Z.Viewport.loadImageProperties(netConnector);
			} else {
				var xmlDoc = Z.Utils.convertXMLTextToXMLDoc(imageProperties);
				Z.Viewport.parseImageXML(xmlDoc);			
			}
		}
	};
	
	this.setHotspotPath = function (hotspotPath) {	
		if (Z.Viewport && Z.Viewport.getInitialized()) { 
			Z.Viewport.setHotspotPath(hotspotPath);
		}
	};
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::: VIEWPORT FUNCTIONS ::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.ZoomifyViewport = function () {

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::: INIT FUNCTIONS :::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// Declare variables for viewport internal self-reference and for initialization completion.
	var self = this;
	var isInitialized = false;
	
	// Set viewport constants and static variables from value in Zoomify Image Folder "ImageProperties.xml" file or Zoomify Image File (PFF) header.
	var IMAGE_VERSION = -1;
	var HEADER_SIZE = 0
	var HEADER_SIZE_TOTAL = 0;
	var CHUNK_SIZE = 256;					
	var TILE_COUNT = 0;
	var TILES_PER_FOLDER = 256;
	var TILE_SIZE = parseInt(Z.Utils.getResource("DEFAULT_TILESIZE"), 10);
	
	// Set other defaults and calculate other constants.
	var TIERS_MAX_SCALE_UP = parseFloat(Z.Utils.getResource("DEFAULT_TIERSMAXSCALEUP"));
	var TIERS_MAX_SCALE_DOWN = TIERS_MAX_SCALE_UP / 2;
	var TILES_MAX_CACHE = parseInt(Z.Utils.getResource("DEFAULT_TILESMAXCACHE"), 10);
	var tlbrOffset = (Z.toolbarVisible == 1) ? Z.toolbarH : 0;

	// Declare variables for viewport displays.
	var viewportContainer, cD, cS;
	var viewportBackfillDisplay, bD, bS, bCtx;
	var viewportDisplay, vD, vS, vCtx;
	var transitionDisplay, tD, tS, tCtx;
	var watermarkDisplay, wD, wS;
	var hotspotDisplay, hD, hS, hotD, hotS, annD, annS;
	var drawingDisplay, dD, dS, dCtx;
	var editingDisplay, eD, eS, eCtx;

	// Create backfill, viewport, watermark, and hotspot displays within container that can be
	// dragged. Scaling occurs in display canvases directly or in tiles if in non-canvas browser.
	createDisplays();

	// Declare variables and lists for viewport tiers and tiles.
	var tierCount = 1, tierCurrent = 0, tierBackfill = 0, tierChanged = false;
	var tierScale, tierScalePrior, tierBackfillScale;
	var tilesBackfillLoaded = [], tilesBackfillLoadingNames = [];
	var tierWs = [], tierHs = [], tierWInTiles = [], tierHInTiles = [],  tierTileCounts = [], tilesInCurrentView = [];
	var tilesLoadingNames = [], tilesLoaded = [], tilesLoadedNames = [], tilesPanningNames = [];
	var offsetChunks = [], offsetChunkBegins = [], tilesRetryNames = [], tilesRetryNamesChunks = [], tilesRetry = [], tilesBackfillRetryNames = []; // Support for Zoomify Image File storage (PFF).
	var tilesToLoadTotal = 0;
	var tileNetConnector = new Z.NetConnector();

	// Declare and set backfill threshold variables.
	var backfillTreshold2 = parseInt(Z.Utils.getResource("DEFAULT_BACKFILLTHRESHOLD2"), 10);
	var backfillTreshold1 = parseInt(Z.Utils.getResource("DEFAULT_BACKFILLTHRESHOLD1"), 10);
	var backfillChoice2 = parseInt(Z.Utils.getResource("DEFAULT_BACKFILLCHOICE2"), 10);
	var backfillChoice1 = parseInt(Z.Utils.getResource("DEFAULT_BACKFILLCHOICE1"), 10);
	var backfillChoice0 = parseInt(Z.Utils.getResource("DEFAULT_BACKFILLCHOICE0"), 10);

	// Declare variables for tile caching area and viewport.
	var PAN_BUFFER = parseFloat(Z.Utils.getResource("DEFAULT_PANBUFFER"), 10);
	var viewW, viewH, viewL, viewT;
	var displayW, displayH, displayCtrX, displayCtrY, displayL, displayR, displayT, displayB;
	var backfillW, backfillH, backfillL, backfillT;

	// Set initial values for tile selection and caching areas.
	viewW = Z.viewerW;
	viewH = Z.viewerH;
	viewL = viewT = 0;

	// Reset viewport height and top if toolbar visible and static (no hide/show or show/hide).
	viewH -= tlbrOffset;
	if (Z.toolbarPosition == 0) { viewT += tlbrOffset; }

	// Declare variables for viewport mouse support.
	var mouseIsDown = false;
	var mouseOutDownPoint = null;
	var dragPtStart, dragPtCurrent;
	
	// Declare variable for gesture support.
	var gestureInterval = null, gestureIntervalPercent = null, wasGesturing = false;
	var GESTURE_TEST_DURATION = parseInt(Z.Utils.getResource("DEFAULT_GESTURETESTDURATION"), 10);
	
	// Declare viewport variables for continuous zoom-and-pan functions.
	var zoomStepDistance = (parseFloat(Z.Utils.getResource("DEFAULT_ZOOMSTEPDISTANCE")) * Z.zoomSpeed);
	if (Z.mobileDevice) { zoomStepDistance /= 2; }
	var panStepDistance = Math.round(parseFloat(Z.Utils.getResource("DEFAULT_PANSTEPDISTANCE")) * Z.panSpeed);
	var panX = 0, panY = 0, zoom = 0, zapStepCount = 0, zoomPrior = 0;
	var zapStepDuration = parseInt(Z.Utils.getResource("DEFAULT_ZAPSTEPDURATION"), 10);
	var zapTimer, zapTierCurrentZoomUnscaledX, zapTierCurrentZoomUnscaledY;
	var fadeInStep = (parseFloat(Z.Utils.getResource("DEFAULT_FADEINSTEP")) * Z.fadeInSpeed);
	var fadeInInterval = null;
	
	// Declare viewport variables for zoom-and-pan-to-view functions.
	var zaptvDuration = parseFloat(Z.Utils.getResource("DEFAULT_ZAPTVDURATION"));
	var zaptvSteps = parseFloat(Z.Utils.getResource("DEFAULT_ZAPTVSTEPS"));
	if (Z.mobileDevice) { zaptvSteps /= 2; }
	var zaptvTimer = null, zaptvStepCurrent = 0;
	
	// Declare viewport variables for toggleFullPageView function.
	var fpBodW, fpBodH, fpBodO, fpDocO, fpContBC, fpContPos, fpContIdx;
	var buttonFPCancel, buttonFPCancelVisible;

	// Prepare watermark variables and image if optional parameter present.
	if (Z.Utils.isStrVal(Z.watermarkPath)) {
		var watermarkImage, watermarkAlpha;
		var watermarksX = [], watermarksY = [];
	}

	// Prepare hotspot and/or annotation variables global to Viewport, if optional parameter present.
	if (Z.Utils.isStrVal(Z.hotspotPath) || Z.Utils.isStrVal(Z.annotationPath)) {
		var hotspots = [], hotspotMediaElements = [];
		var hotspotCurrentID = null, polygonCurrentPts = null, polygonsRequireCanvasAlertShown = false;
		var polygonClosed = true, controlPointCurrent = null, controlPointDragging = false;
		var hotspotNetConnector = new Z.NetConnector();
		var polygonLineW = Z.Utils.getResource("DEFAULT_POLYGONLINEWIDTH");
		var polygonViewIncrement = parseInt(Z.Utils.getResource("DEFAULT_POLYGONVIEWINCREMENT"), 10);
		var ctrlPtLineW = Z.Utils.getResource("DEFAULT_CONTROLPOINTLINEWIDTH");
		var ctrlPtStrokeColor = Z.Utils.getResource("DEFAULT_CONTROLPOINTSTROKECOLOR");
		var firstCtrlPtFillColor = Z.Utils.getResource("DEFAULT_FIRSTCONTROLPOINTFILLCOLOR");
		var stdCtrlPtFillColor = Z.Utils.getResource("DEFAULT_STANDARDCONTROLPOINTFILLCOLOR");
		var ctrlPtRadius = parseInt(Z.Utils.getResource("DEFAULT_CONTROLPOINTRADIUS"), 10);
		var defaultFontSize = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTCAPTIONFONTSIZE"), 10);
		var minFontSize = parseInt(Z.Utils.getResource("DEFAULT_MINHOTSPOTCAPTIONFONTSIZE"), 10);
		var maxFontSize = parseInt(Z.Utils.getResource("DEFAULT_MAXHOTSPOTCAPTIONFONTSIZE"), 10);
		var defaultPadding = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTCAPTIONPADDING"), 10);
		var minPadding = parseInt(Z.Utils.getResource("DEFAULT_MINHOTSPOTCAPTIONPADDING"), 10);
		var maxPadding = parseInt(Z.Utils.getResource("DEFAULT_MAXHOTSPOTCAPTIONPADDING"), 10);
		if (Z.mobileDevice) { ctrlPtRadius *= 2; }
		if (Z.Utils.isStrVal(Z.hotspotPath)) {
			var hotspotList, hotspotListPosition, hotspotsInitialVisibility;
			var hotspotsMinScale, hotspotsMaxScale;
			var hotspotListDP = [];
		} else if (Z.Utils.isStrVal(Z.annotationPath)) {
			var annotationsXML, annotationPanelPosition, poiList, noteList, noteVisibility;
			var labelList, labelsMinScale, labelsMaxScale;
			var poiListDP = [], labelListDP = [], labelListCurrentDP = [], noteListDP = [], noteListCurrentDP = [];
			var hotspotsRollback = [], poiListDPRollback = [], labelListDPRollback = [], noteListDPRollback = [];
			var annotationPanelInitialized = false;
		}
	}
	// Set initial dimensions and location of all viewport displays.
	sizeAndPosition(viewW, viewH, viewL, viewT);

	if (Z.imageW !== null && Z.imageH !== null && Z.sourceMagnification !== null ) {
		// Example image server protocol implementation: image properties provided via HTML parameters.
		if (Z.tileSize !== null) { TILE_SIZE = Z.tileSize; }
		if (typeof self.getInitialized === "undefined") {
			var viewportInitTimer = window.setTimeout( function() { initializeViewport(Z.imageW, Z.imageH, TILE_SIZE, null, null, null, null, Z.sourceMagnification, Z.focal, Z.quality); }, 100);
		} else {		
			initializeViewport(Z.imageW, Z.imageH, TILE_SIZE, null, null, null, null, Z.sourceMagnification, Z.focal, Z.quality);
		}
		
		// Optional implementation: Image properties provided by image server. Note that this
		// approach sets width, height, and tile size values directly from parameters during page
		// loading so it sets those values prior to viewer initialization and never during reinitialization.
		// See additional notes in function loadImagePropertiesFromImageServer.
		//var netConnector = new Z.NetConnector();
		//loadImageProperties(netConnector);		
	} else if (Z.imageProperties != null) {
		// Receive image properties as XML text in HTML parameter.
		// Convert to XML doc and parse - skipping XML loading steps.
		// This approach provides workaround for cross-domain image storage
		// and also enables optional support for image server tile fulfillment.
		var xmlDoc = Z.Utils.convertXMLTextToXMLDoc(Z.imageProperties);
		parseImageXML(xmlDoc);
	} else {
		// Load image XML to get image width and height and tile size.
		var netConnector = new Z.NetConnector();
		loadImageProperties(netConnector);
	}
	
	// Initialization on callback after XML load.
	function initializeViewport (iW, iH, tSz, iTileCount, iVersion, iHeaderSize, iHeaderSizeTotal, iMagnification, iFocal, iQuality) {		
		// Set viewport variables to XML or header values.
		Z.imageW = iW;
		Z.imageH = iH;				
		IMAGE_VERSION = iVersion;
		HEADER_SIZE = iHeaderSize;
		HEADER_SIZE_TOTAL = iHeaderSizeTotal;	
		TILE_COUNT = iTileCount;
		TILE_SIZE = tSz;
		
		// Example image server implementation: from example HTML or XML parameters.
		Z.sourceMagnification = iMagnification;
		Z.focal = iFocal;
		Z.quality = iQuality;

		// Record tier dimensions and tile counts for fast access and ensure zoom and pan
		// initial values and limits do not conflict.
		calculateTierValues();
		validateXYZDefaults();

		// Set canvas scale default.
		tierBackfillScale = convertZoomToTierScale(tierBackfill, Z.initialZ);
		tierScale = convertZoomToTierScale(tierCurrent, Z.initialZ);
		tierScalePrior = tierScale;		
		if (Z.useCanvas) { vCtx.scale(tierScale, tierScale); }
		
		// Load watermark, load backfill tiles, and set initial view.
		if (wD) { loadWatermark(); }
		if (hD) { loadHotspotsOrAnnotationsXML(); }
		precacheBackfillTiles();
		view(Z.initialX, Z.initialY, Z.initialZ);
		
		// Set initial display to full page if parameter true.
		if (Z.fullPageInitial) { self.toggleFullPageView(true); }

		// Enable mouse and keyboard, initialize viewport, configure toolbar and navigator components.
		initializeViewportEventListeners();
		setInitialized(true);
		Z.Viewer.configureComponents();
	};
	
	// Initialization on callback after XML load after change of image path via setImagePath function.
	function reinitializeViewport (iW, iH, tSz, iTileCount, iVersion, iHeaderSize, iHeaderSizeTotal, iMagnification, iFocal, iQuality) {	
		// Clear prior image values.
		setInitialized(false);
		clearAll();
		
		// Calculate new image values.
		Z.imageW = iW;
		Z.imageH = iH;			
		IMAGE_VERSION = iVersion;
		HEADER_SIZE = iHeaderSize;
		HEADER_SIZE_TOTAL = iHeaderSizeTotal;	
		TILE_COUNT = iTileCount;
		TILE_SIZE = tSz;
		
		calculateTierValues();
		validateXYZDefaults();		
		tierBackfillScale = convertZoomToTierScale(tierBackfill, Z.initialZ);
		tierScale = convertZoomToTierScale(tierCurrent, Z.initialZ);
		tierScalePrior = tierScale;		
		if (Z.useCanvas) { 
			vCtx.restore();
			vCtx.scale(tierScale, tierScale); 
		}		
		
		// Clear and reset displays.
		if (bD) { clearDisplay(bD); }
		if (vD) { clearDisplay(vD); }
		if (tD) { clearDisplay(tD); }
		if (wD) { clearDisplay(wD); }
		if (hD) { clearDisplay(hD); }
		if (dD) { clearDisplay(dD); }
		if (eD) { clearDisplay(eD); }
		
		// Load watermark, load backfill tiles, and set initial view.
		if (wD) { loadWatermark(); }
		if (hD) { loadHotspotsOrAnnotationsXML(); }
		precacheBackfillTiles();
		sizeAndPosition(viewW, viewH, viewL, viewT);
		view(Z.initialX, Z.initialY, Z.initialZ);
		setInitialized(true);
		
		// Reinitialize related components.
		if (Z.navigatorVisible > 0) { Z.Navigator.setImagePath(Z.imagePath); }
	};
	
	function clearAll () {
		tierCount = 1;
		tierCurrent = 0; tierBackfill = 0;
		tilesBackfillLoaded = []; tilesBackfillLoadingNames = [];
		tierWs = []; tierHs = []; tierWInTiles = []; tierHInTiles = [];  tierTileCounts = []; tilesInCurrentView = [];
		tilesLoadingNames = []; tilesLoaded = []; tilesLoadedNames = []; tilesPanningNames = [];
		offsetChunks = []; offsetChunkBegins = []; tilesRetryNames = []; tilesRetryNamesChunks = []; tilesRetry = []; tilesBackfillRetryNames = [];
		tilesToLoadTotal = 0;
		if (wD) { 
			watermarksX = [];
			watermarksY = [];
		}
		if (hD) {
			hotspots = []; hotspotMediaElements = [];
			if (hotspotList != null) {
				hotspotListDP = []; 
			} else {
				poiListDP = []; noteListDP = []; noteListCurrentDP = []; 
				labelListDP = []; labelListCurrentDP = []; 
			}
		}
	};

	function createDisplays () {
		// Create draggable container for backfill, viewport, watermark, and hotspot displays.
		// Scaling occurs in display canvases directly or in tiles if in non-canvas browser.
		// Set position 'absolute' within parent viewerDisplay container that is set 'relative'.
		viewportContainer = Z.Utils.createContainerElement("div", "viewportContainer", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
		Z.ViewerDisplay.appendChild(viewportContainer);
		cD = viewportContainer;
		cS = cD.style;

		// Create background display to fill gaps between foreground tiles in viewportDisplay.
		// Note that using canvas is practical because backfill tier is low res and thus small and canvas is CSS scaled large, not internally scaled large or drawn large.
		viewportBackfillDisplay = Z.Utils.createContainerElement(Z.useCanvas ? "canvas" : "div", "viewportBackfillDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
		viewportContainer.appendChild(viewportBackfillDisplay);
		bD = viewportBackfillDisplay;
		bS = bD.style;

		// Create canvas or div container for image tiles.
		viewportDisplay = Z.Utils.createContainerElement(Z.useCanvas ? "canvas" : "div", "viewportDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
		viewportContainer.appendChild(viewportDisplay);
		vD = viewportDisplay;
		vS = vD.style;

		// If using canvas browser, create transition canvas for temporary display while display canvas is updated.
		if (Z.useCanvas) { 
			transitionDisplay = Z.Utils.createContainerElement("canvas", "transitionDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
			viewportContainer.appendChild(transitionDisplay);
			tD = transitionDisplay;
			tS = tD.style;
		}

		// Create canvas or div container for watermarks.
		if (Z.Utils.isStrVal(Z.watermarkPath)) {
			watermarkDisplay = Z.Utils.createContainerElement("div", "watermarkDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
			viewportContainer.appendChild(watermarkDisplay);
			wD = watermarkDisplay;
			wS = wD.style;
		}

		// Create canvas or div container for hotspots.
		if (Z.Utils.isStrVal(Z.hotspotPath) || Z.Utils.isStrVal(Z.annotationPath)) {
			// If viewing annotations in a canvas browser create canvas for drawn contents such as polygons.
			if (Z.Utils.isStrVal(Z.annotationPath) && Z.useCanvas) {
				drawingDisplay = Z.Utils.createContainerElement("canvas", "drawingDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
				viewportContainer.appendChild(drawingDisplay);
				dD = drawingDisplay;
				dS = dD.style;
			
				// If in edit mode in a canvas browser create canvas for editing polygon or other drawn graphics of hotspot currently selected in labels choicelist.
				if (Z.editMode) {
					editingDisplay = Z.Utils.createContainerElement("canvas", "editingDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
					viewportContainer.appendChild(editingDisplay);
					eD = editingDisplay;
					eS = eD.style;
				}
			}
			
			hotspotDisplay = Z.Utils.createContainerElement("div", "hotspotDisplay", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
			viewportContainer.appendChild(hotspotDisplay);			
			hD = hotspotDisplay;
			hS = hD.style;
		}

		// Create canvas access variables.
		if (Z.useCanvas) {
			bCtx = bD.getContext("2d");
			vCtx = vD.getContext("2d");
			tCtx = tD.getContext("2d");
		} else {
			bD.innerHTML = "";
			vD.innerHTML = "";
		}
		if (wD) { wD.innerHTML = ""; }
		if (hD) { hD.innerHTML = ""; }
		if (dD) { dCtx = dD.getContext("2d"); }
		if (eD) { eCtx = eD.getContext("2d"); }
	};

	function sizeAndPosition (width, height, left, top) {
		// Set Viewport size and set base values or subsequent gets and sets will fail.
		if (typeof left === "undefined" || left === null) { left = 0; }
		if (typeof top === "undefined" || top === null) { top = 0; }
		
		viewW = width;
		viewH = height;
		displayW = viewW * PAN_BUFFER;
		displayH = viewH * PAN_BUFFER;
		displayCtrX = displayW / 2;
		displayCtrY = displayH / 2;
		displayL = -((displayW - viewW) / 2) + left;
		displayR = ((displayW - viewW) / 2) + left;
		displayT = -((displayH - viewH) / 2) + top;
		displayB = ((displayH - viewH) / 2) + top;

		cD.width = displayW;
		cD.height = displayH;
		cS.width = displayW + "px";
		cS.height = displayH + "px";

		// Set container position. Viewport, watermark, and hotspot display values are static as
		// they move via the container. Backfill display changes position and size as it scales
		// to support Navigator panning.
		cS.left =  displayL + "px";
		cS.top =  displayT + "px";

		// Sync viewport display size.
		vD.width = displayW;
		vD.height = displayH;

		// Sync watermark display size.
		if (wD) {
			wD.width = displayW;
			wD.height = displayH;
			wS.width = displayW + "px";
			wS.height = displayH + "px";
		}
		
		// Sync hotspot display size.
		if (hD) {
			hD.width = displayW;
			hD.height = displayH;
			hS.width = displayW + "px";
			hS.height = displayH + "px";
			if (hotD) {
				var listW = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTLISTWIDTH"), 10);
				var listCoords = getHotspotListCoords(hotspotListPosition, listW, viewW, viewH); // viewH allows for toolbar height if static in viewer display area.
				hotS.left = listCoords.x + "px";
				hotS.top = listCoords.y + "px";
			}
		}
		
		// Sync drawing display size.
		if (dD) {
			dD.width = displayW;
			dD.height = displayH;
			dS.width = displayW + "px";
			dS.height = displayH + "px";
		}		
		
		// Sync editing display size.
		if (eD) {
			eD.width = displayW;
			eD.height = displayH;
			eS.width = displayW + "px";
			eS.height = displayH + "px";
		}
		
		if (annD) {
			var panelW = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELWIDTH"), 10);
			var panelH = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELHEIGHT"), 10);
			var panelCoords = getAnnotationPanelCoords(annotationPanelPosition, panelW, panelH, viewW, viewH); // viewH allows for toolbar height if static in viewer display area.
			annS.left = panelCoords.x + "px";
			annS.top = panelCoords.y + "px";
		}
		
		// Set drawing origin coordinates to viewport display center.
		if (Z.useCanvas) {
			vCtx.translate(displayCtrX, displayCtrY);
			vCtx.save();
			if (dD) {
				dCtx.translate(displayCtrX, displayCtrY);
				dCtx.save();
			}
			if (eD) {
				eCtx.translate(displayCtrX, displayCtrY);
				eCtx.save();
			}
		}
		// No sizeAndPosition steps required here for non-canvas browsers because positioning
		// occurs in drawTileInHTML function based on x and y values passed in by displayTile.
	};

	this.loadImageProperties = function (netCnnctr) {
		loadImageProperties(netCnnctr);
	};
	
	function loadImageProperties (netCnnctr) {
		// Load image properties from Zoomify Image Folder XML file or Zoomify Image File PFF header or other specified tile source.
		if (Z.tileSource == "ZoomifyImageFolder") {
			var imageXMLPath = Z.Utils.cacheProofPath(Z.imagePath + "/" + "ImageProperties.xml");
			netCnnctr.loadXML(imageXMLPath);
		} else if (Z.tileSource == "ZoomifyImageFile") {		
			loadImagePropertiesFromPFF(netCnnctr);
		} else if (Z.tileSource == "ImageServer") { 
			// Example image server protocol implementation.
			loadImagePropertiesFromImageServer(netCnnctr);
		}
	};
	
	this.parseImageXML = function (xmlDoc) {
		parseImageXML(xmlDoc);
	};
	
	function parseImageXML (xmlDoc) {
		if (typeof self.getInitialized === "undefined") {
			var viewportInitTimer = window.setTimeout( function() { parseImageXML(xmlDoc); }, 100);
		} else {
			// Get key properties of Zoomify Image and initialize Viewport.
			var iW = null, iH = null, tSz = null, iTileCount = null, iImageCount = null, iVersion = null, iHeaderSize = null, iHeaderSizeTotal = null, iMagnification = null, iFocal = null, iQuality = null;
		
			if (Z.tileSource == "ZoomifyImageFolder") {
				iW = parseInt(xmlDoc.documentElement.getAttribute("WIDTH"), 10);
				iH = parseInt(xmlDoc.documentElement.getAttribute("HEIGHT"), 10);
				iTileCount = parseInt(xmlDoc.documentElement.getAttribute("NUMTILES"), 10);
				iImageCount = parseInt(xmlDoc.documentElement.getAttribute("NUMIMAGES"), 10);
				iVersion = parseInt(xmlDoc.documentElement.getAttribute("VERSION"), 10);
				tSz = parseInt(xmlDoc.documentElement.getAttribute("TILESIZE"), 10);
			} else if (Z.tileSource == "ZoomifyImageFile") {
				iW = parseInt(xmlDoc.documentElement.getAttribute("WIDTH"), 10);
				iH = parseInt(xmlDoc.documentElement.getAttribute("HEIGHT"), 10);
				tSz = parseInt(xmlDoc.documentElement.getAttribute("TILESIZE"), 10);
				iTileCount = parseInt(xmlDoc.documentElement.getAttribute("NUMTILES"), 10);
				iImageCount = parseInt(xmlDoc.documentElement.getAttribute("NUMIMAGES"), 10);
				iVersion = parseInt(xmlDoc.documentElement.getAttribute("VERSION"), 10);
				iHeaderSize = parseInt(xmlDoc.documentElement.getAttribute("HEADERSIZE"), 10);
				iHeaderSizeTotal = 904 + 136 + 20 + iHeaderSize;
			} else if (Z.tileSource == "ImageServer") {
				// Allow for partial XML where submission is via zImageProperties HTML parameter
				// because in that context all fields but image width and height will be optional.
				iW = parseInt(xmlDoc.documentElement.getAttribute("WIDTH"), 10);
				iH = parseInt(xmlDoc.documentElement.getAttribute("HEIGHT"), 10);
				var tempTSz = xmlDoc.documentElement.getAttribute("TILESIZE");
				tSz = (Z.Utils.isStrVal(tempTSz)) ? parseInt(tempTSz, 10) : TILE_SIZE;
				var tempMag = xmlDoc.documentElement.getAttribute("MAGNIFICATION");
				iMagnification = (Z.Utils.isStrVal(tempMag)) ? parseInt(tempMag, 10) : Z.sourceMagnification;
				var tempFoc = xmlDoc.documentElement.getAttribute("FOCAL");
				iFocal = (Z.Utils.isStrVal(tempFoc)) ? parseInt(tempFoc, 10) : Z.focal;				
				var tempQual = xmlDoc.documentElement.getAttribute("QUALITY");
				iQuality = (Z.Utils.isStrVal(tempQual)) ? parseInt(tempQual, 10) : Z.quality;
							
				// Optional implementation: Add additional instructions here to receive image server 
				// response with necessary image properties. Set values iW and iH, and also tSz if
				// tile size not 256x256 pixels for processing by remaining steps within this function.
			}
			
			// Allow for minimal cross-domain XML and incorrectly edited image folder XML.
			if (Z.tileSource == "ZoomifyImageFolder" || Z.tileSource == "ImageServer") {
				if (tSz == null || isNaN(tSz)) { tSz = TILE_SIZE; }
				if (iTileCount == null || isNaN(iTileCount)) { iTileCount = 1; }
			}
			
			if (!isNaN(iW) && iW > 0 && !isNaN(iH) && iH > 0 && !isNaN(tSz) && tSz > 0 && iTileCount > 0) {
				if (!self.getInitialized()) {
					initializeViewport(iW, iH, tSz, iTileCount, iVersion, iHeaderSize, iHeaderSizeTotal, iMagnification, iFocal, iQuality);
				} else {
					reinitializeViewport(iW, iH, tSz, iTileCount, iVersion, iHeaderSize, iHeaderSizeTotal, iMagnification, iFocal, iQuality);					
				}
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_IMAGEXMLINVALID"));			
			}
		}
	};

	function loadImagePropertiesFromPFF (netCnnctr) {
		// Define constants.
		var REQUEST_TYPE = 1; // 1 = header, 2 = offset, 0 = tile.
		var HEADER_START_BYTE = 0;
		var HEADER_END_BYTE = 1060;
		
		// Build data request with query string and send.
		var imgPathNoDot = Z.imagePath.replace(".", "%2E");  // Required for servlet.
		var imageXMLPath = Z.tileHandlerPathFull + "?file=" + imgPathNoDot  + "&requestType=" + REQUEST_TYPE + "&begin=" + HEADER_START_BYTE + "&end=" + HEADER_END_BYTE;
		netCnnctr.loadXML(imageXMLPath);
	};

	function loadImagePropertiesFromImageServer () {
		// Example image server protocol implementation - optional implementation: 
		// Image properties provided by image server.  Modify the following line to request 
		// image properties according to specific 3rd party image server protocol as documented
		// by image server provider. Minimum return values required: full source image width and
		// height, and tile size if not 256x256 pixels. Additionally modify function 'parseImageXML'
		// as noted in 'Optional implementation' notes within that function.
		//var imageXMLPath = Z.tileHandlerPathFull + "?" + "...";
		//netCnnctr.loadXML(imageXMLPath);
	};
	
	function calculateTierValues () {
		var tilesCounted = calculateTierValuesNewMethod();
		if (tilesCounted != TILE_COUNT && (Z.tileSource == "ZoomifyImageFolder" || Z.tileSource == "ZoomifyImageFile")) {
			tilesCounted = calculateTierValuesOldMethod();
			if (tilesCounted != TILE_COUNT) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_IMAGETILECOUNTINVALID"));
			}
		}
	};
	
	function calculateTierValuesNewMethod () {
		// Determine the number of tiers.
		var tempW = Z.imageW;
		var tempH = Z.imageH;
		while (tempW > TILE_SIZE || tempH > TILE_SIZE) {
			tempW = tempW / 2;
			tempH = tempH / 2;
			tierCount++;
		}
		
		// Determine and record dimensions of each image tier.
		tempW = Z.imageW;
		tempH = Z.imageH;
		var tileCounter = 0;
		for (var t = tierCount - 1; t >= 0; t--) {
			tierWs[t] = tempW;
			tierHs[t] = tempH;
			tierWInTiles[t] = Math.ceil(tierWs[t] / TILE_SIZE);
			tierHInTiles[t] = Math.ceil(tierHs[t] / TILE_SIZE);
			tierTileCounts[t] = tierWInTiles[t] * tierHInTiles[t];
			tempW = tempW / 2;
			tempH = tempH / 2;

			tileCounter += tierTileCounts[t];
		}
		
		// Debug option: console.log("New method: " + tileCounter + "  " + TILE_COUNT);
		return tileCounter;
	};

	function calculateTierValuesOldMethod () {
		// Clear values from prior calculation attempt.
		tierWs =  [];
		tierHs =  [];
		tierWInTiles =  [];
		tierHInTiles =  [];
		tierCount = 0;
		
		// Determine the number of tiers.
		var pyramidType = "DIV2";
		var tempW = Z.imageW;
		var tempH = Z.imageH;
		tierCount = 1;
		var divider = 2;	
		while (tempW > TILE_SIZE || tempH > TILE_SIZE) {
			if (pyramidType == "Div2") {
				tempW = Math.floor(tempW / 2);
				tempH = Math.floor(tempH / 2);
			} else if (pyramidType == "Plus1Div2") {
				tempW = Math.floor((tempW+1) / 2);
				tempH = Math.floor((tempH+1) / 2);
			} else {
				tempW = Math.floor(Z.imageW / divider)
				tempH = Math.floor(Z.imageH / divider);
				divider *= 2;
				if (tempW % 2) { tempW++; }
				if (tempH % 2) { tempH++; }
			}
			tierCount++;
		}

		// Determine and record dimensions of each image tier.
		tempW = Z.imageW;
		tempH = Z.imageH;	
		divider = 2;	
		tileCounter = 0;
		for (var t = tierCount - 1; t >= 0; t--) {
			tierWInTiles[t] = Math.floor(tempW / TILE_SIZE);
			if (tempW % TILE_SIZE) { tierWInTiles[t]++; }				
			tierHInTiles[t] = Math.floor(tempH / TILE_SIZE);
			if (tempH % TILE_SIZE) { tierHInTiles[t]++; }				
			tierTileCounts[t] = tierWInTiles[t] * tierHInTiles[t];
			
			tileCounter += tierTileCounts[t];

			tierWs[t] = tempW;
			tierHs[t] = tempH;		
			if (pyramidType == "Div2") {
				tempW = Math.floor(tempW / 2);
				tempH = Math.floor(tempH / 2);
			} else if (pyramidType == "Plus1Div2") {
				tempW = Math.floor((tempW + 1) / 2);
				tempH = Math.floor((tempH + 1) / 2);
			} else {
				tempW = Math.floor(Z.imageW / divider)
				tempH = Math.floor(Z.imageH / divider);
				divider *= 2;
				if (tempW % 2) { tempW++; }
				if (tempH % 2) { tempH++; }			
			}
		}	
		
		// Debug option: console.log("Old method: " + tileCounter + "  " + TILE_COUNT);
		return tileCounter;
	};

	function validateXYZDefaults () {
		// Get default values.
		var iX = parseFloat(Z.Utils.getResource("DEFAULT_INITIALX"));
		var iY = parseFloat(Z.Utils.getResource("DEFAULT_INITIALY"));
		var iZ = parseFloat(Z.Utils.getResource("DEFAULT_INITIALZOOM"));
		var mnZ = parseFloat(Z.Utils.getResource("DEFAULT_MINZOOM"));
		var mxZ = parseFloat(Z.Utils.getResource("DEFAULT_MAXZOOM"));
		niX = !isNaN(iX) ? iX : null;
		niY = !isNaN(iY) ? iY : null;
		niZ = !isNaN(iZ) ? iZ : null;
		nmnZ = !isNaN(mnZ) ? mnZ : null;
		nmxZ = !isNaN(mxZ) ? mxZ : null;
		
		// Set default values for all or only specific variables, where parameters are not set.
		if (!Z.parameters) { 
			Z.initialX = niX;
			Z.initialY = niY;
			Z.initialZ = niZ;
			Z.minZ = nmnZ;
			Z.maxZ = nmxZ;
		} else {
			var zParams = Z.parameters.toString();
			if (zParams.indexOf("zInitialX") == -1) {  Z.initialX = niX; }
			if (zParams.indexOf("zInitialY") == -1) {  Z.initialY = niY; }
			if (zParams.indexOf("zInitialZoom") == -1) {  Z.initialZ = niZ; }
			if (zParams.indexOf("zMinZ") == -1) {  Z.minZ = nmnZ; }
			if (zParams.indexOf("zMaxZ") == -1) {  Z.maxZ = nmxZ; }
		}
		
		// Set pan center point as default if required.
		if (Z.initialX == null) { Z.initialX = Z.imageW / 2; }
		if (Z.initialY == null) { Z.initialY = Z.imageH / 2; }
	
		// Set defaults if required.
		Z.fitZ = calculateZoomDecimalToFitDisplay(); 
		if (Z.initialZ == null) { Z.initialZ = Z.fitZ; }
		if (Z.minZ == null) { Z.minZ = Z.fitZ; }
		if (Z.maxZ == null) { Z.maxZ = Z.fitZ; }

		// Constrain initial zoom within min and max zoom.
		if (Z.initialZ < Z.minZ) { Z.initialZ = Z.minZ; }
		if (Z.initialZ > Z.maxZ) { Z.initialZ = Z.maxZ; }
	};
	
	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::: GET & SET FUNCTIONS :::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	this.getInitialized = function () {
		return getInitialized();
	};

	function getInitialized () {
		return isInitialized;
	};

	function setInitialized (value) {
		isInitialized = value;
	};
	
	this.getW = function () {
		return displayW;
	};

	this.getH = function () {
		return displayH;
	};

	this.getTierCount = function () {
		return tierCount;
	};

	this.getTileSize = function () {
		return TILE_SIZE;
	};

	this.getTierCurrent = function () {
		return tierCurrent;
	};

	this.getTierScale = function () {
		return tierScale;
	};
	
	this.getX = function () {
		var deltaX = parseFloat(cS.left) - displayL;
		var currentZ = self.getZoom();
		var currentX = Z.imageX - (deltaX / currentZ);	
		return currentX;
	};
	
	this.getY = function () {
		var deltaY = parseFloat(cS.top) - displayT;
		var currentZ = self.getZoom();
		var currentY = Z.imageY - (deltaY / currentZ);		
		return currentY;
	};

	this.getZoom = function () {
		var currentZ = convertTierScaleToZoom(tierCurrent, tierScale);
		return currentZ;
	};

	this.getTiersMaxScaleUp = function () {
		return TIERS_MAX_SCALE_UP;
	};

	this.getTiersMaxScaleDown = function () {
		return TIERS_MAX_SCALE_DOWN;
	};

	this.getTilesMaxCache = function () {
		return TILES_MAX_CACHE;
	};

	this.getTierWs = function () {
		return tierWs.join(",");
	};

	this.getTierHs = function () {
		return tierHs.join(", ");
	};

	this.getTierTileCounts = function () {
		return tierTileCounts.join(", ");
	};

	this.getTilesLoadingNames = function () {
		var tilesLoading = (tilesLoadingNames.join(", ") == "") ? "Current view loading complete" : tilesLoadingNames.join(", ");
		return tilesLoading;
	};

	this.setSizeAndPosition = function (width, height, left, top) {
		sizeAndPosition(width, height, left, top);
	};

	this.setHotspotPath = function (hotspotPath) {	
		if (hD) { Z.hotspotPath = Z.Utils.removeTrailingSlashCharacters(hotspotPath); }
	};
	
	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::: CORE FUNCTIONS :::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	function precacheBackfillTiles () {
		precacheBackfillTileNames(backfillChoice0);
		if (tierCount > backfillTreshold1) {
			precacheBackfillTileNames(backfillChoice1);
			if (tierCount > backfillTreshold2) {
				precacheBackfillTileNames(backfillChoice2);
			}
		}
		tilesBackfillLoadingNames.sort();
		tilesBackfillLoadingNames = Z.Utils.removeDups(tilesBackfillLoadingNames);
		loadNewTiles(tilesBackfillLoadingNames, onTileBackfillLoad, "simple", "backfill");
	};

	function precacheBackfillTileNames (tier) {
		var backfillColumnR = tierWInTiles[tier] - 1;
		var backfillRowB = tierHInTiles[tier] - 1;
		for (var rowCntr = 0; rowCntr <= backfillRowB; rowCntr++) {
			for (var columnCntr = 0; columnCntr <= backfillColumnR; columnCntr++) {
				tilesBackfillLoadingNames.push(tier + "-" + columnCntr + "-" + rowCntr);
			}
		}
	};

	function updateViewWhilePanning (stepX, stepY) {
		// Streamlined version of updateView code (which is called in full form on pan end).
		// DEV NOTE: Updating tiles while panning disabled. Requires optimization.
	};

	this.updateView = function (override) {
		// Main drawing function called after every change of view.  First reposition and
		// rescale backfill, viewport and related displays to transfer any panning and/or
		// scaling from container and CSS values to canvas or tile image values.

		// First ensure any action is needed.
		if ((typeof override !== "undefined" && override === true) || tierScale != tierScalePrior || Z.imageZ != zoomPrior || parseFloat(cS.left) != displayL || parseFloat(cS.top) != displayT) {
			
			// Recenter position of container of displays and reset any scaling of canvases or
			// tile image elements. This prepares all objects for new content.
			resetDisplays(override);
			
			// If zooming, change viewport and backfill tiers if necessary.
			zoomPrior = self.getZoom();
			var delayClear = false;
			if (override || tierScale != tierScalePrior || Z.imageZ != zoomPrior || !isInitialized) {
				selectTier();
				selectBackfillTier();
				redisplayCachedTiles(bD, tierBackfill, tilesBackfillLoaded, "simple", false, "2. Updating view: changing tier - backfill");
				if (!override && TILES_MAX_CACHE > 0) { delayClear = true; }
			} else {
				// Debug option: Use zDebug=2 parameter to display tier has not changed.
				if (Z.debug == 2) { Z.Utils.trace("2. Updating view: no change to tier."); }
			}
			
			// If zooming or panning, refill viewport with cached tiles or load new tiles.
			selectTiles();
			redisplayCachedTiles(vD, tierCurrent, tilesLoaded, "centerOut", delayClear, "3. Updating view: prior to loading of any new tiles");
			loadNewTiles(tilesLoadingNames, onTileLoad, "centerOut", "display"); 

			// Update related displays and components.
			redisplayWatermarks();
			redisplayHotspots();
			syncToolbarSlider();
			syncNavigator();
		}
	};

	function resetDisplays (override) {
		// If display scaled or panned, reset scale and position to maintain container center
		// point and adjust current tiles to offset change and fill view while new tiles load.
		var redisplayRequired = false;
		
		// Test for scaling to reset.
		if (override || parseFloat(vS.width) != vD.width) {
		
			if (Z.useCanvas) {
				// Reset viewport display by returning to start values.
				vS.width = vD.width + "px";
				vS.height = vD.height + "px";
				vS.left = "0px";
				vS.top = "0px";
				
				// Reset viewport canvas then transfer CSS scaling to internal canvas scale.
				vCtx.restore();
				vCtx.save();
				vCtx.scale(tierScale, tierScale);
				
				// Sync drawing canvas.
				if (dD) {
					dS.width = dD.width + "px";
					dS.height = dD.height + "px";
					dS.left = "0px";
					dS.top = "0px";
				}
				
				// Sync editing canvas.
				if (eD) {
					eS.width = eD.width + "px";
					eS.height = eD.height + "px";
					eS.left = "0px";
					eS.top = "0px";
				}

				// Backfill display does not require resetting here because for canvas browsers
				// its size is set only when the backfill tier changes in the selectBackfillTier 
				// function, and its position is controlled by the container it is in.  Note that 
				// backfill scaling occurs in the scaleTierToZoom or redisplayCachedTiles 
				// functions depending on whether it is implemented as a canvas or not. 
				// Positioning of its container and its offsetting within that container, occur below.
			}
			// No 'else' clause here for non-canvas browsers because scaling occurs in the
			// drawTileInHTML function based on tierScale passed in by displayTile. The 
			// dimensions of the displays are unimportant as the tiles are drawn to overflow.
			// The positions of the displays are set below where panning changes are reset.

			redisplayRequired = true;
		}

		// Test for panning to reset.  Update imageX and imageY to offset so that
    		// when tiles are redrawn they will be in the same position in the view.
    		if (override || parseFloat(cS.left) != displayL || parseFloat(cS.top) != displayT) {
    		
    			// Calculate pan change in position.
			var deltaX = parseFloat(cS.left) - displayL;
    			var deltaY = parseFloat(cS.top) - displayT;
    			
    			// Recenter viewport display.
			cS.left = displayL + "px";
			cS.top = displayT + "px";

			// Reset backfill tracking variables and reposition backfill display to offset container
			// recentering. Backfill will not be redrawn in the redisplayRequired clause below.
			backfillL = (parseFloat(bS.left) + deltaX);
			backfillT = (parseFloat(bS.top) + deltaY);
			bS.left = backfillL + "px";
			bS.top = backfillT + "px";

			// Update imageX and imageY values to offset.
			var currentZ = self.getZoom();
			Z.imageX = Z.imageX - (deltaX / currentZ);
    			Z.imageY = Z.imageY - (deltaY / currentZ);

			redisplayRequired = true;
		}

		if (redisplayRequired) {
			redisplayCachedTiles(vD, tierCurrent, tilesLoaded, "centerOut", false, "1. Updating view: resetting display positions");
		}
    	};

	function selectTier() {
		// If tier has been scaled translate scaling to zoom tracking variable.
		if (tierScale != tierScalePrior) { Z.imageZ = zoomPrior; }
		if (Z.imageZ < Z.minZ) { Z.imageZ = Z.minZ; } // Prevent infinite loop on constraint failure in case of JS timing errors.

		// Determine best image tier and scale combination for intended zoom.
		var calcZ = TIERS_MAX_SCALE_UP;
		var tierTarget = tierCount;
		while(calcZ / 2 >= Z.imageZ) {
			tierTarget--;
			calcZ /= 2;
		}
		tierTarget = (tierTarget - 1 < 0) ? 0 : tierTarget - 1; // Convert to array base 0.
		var tierScaleTarget = convertZoomToTierScale(tierTarget, Z.imageZ);

		// If zooming, apply new tier and scale calculations.  No steps required here for the 
		// drawing canvas as its scale doesn't change, only the control point coordinates do.
		if (tierTarget != tierCurrent || tierScaleTarget != tierScale) {
			if (Z.useCanvas) {
				vCtx.restore();
				vCtx.save();
				vCtx.scale(tierScaleTarget, tierScaleTarget);
			}
			// No steps required here for non-canvas browsers because scaling occurs
			// in drawTileInHTML function based on tierScale passed in by displayTile.

			// Reset tier and zoom variables.
			if (tierCurrent != tierTarget) { tierChanged = true; }
			tierCurrent = tierTarget;
			tierScale = tierScaleTarget;
		}
		tierScalePrior = tierScale;
	};

	function selectBackfillTier() {
		// Use high backfill tier behind high frontfill tiers to avoid blurry backfill when panning at full
		// zoom.  Use 0 backfill tier behind low frontfill tiers to avoid tiles gaps lining up.
		tierBackfill = (tierCurrent > backfillTreshold2) ? backfillChoice2 : (tierCurrent > backfillTreshold1) ? backfillChoice1 : backfillChoice0;
		tierBackfillScale = convertZoomToTierScale(tierBackfill, Z.imageZ);
		tierBackfillW = tierWs[tierBackfill];
		tierBackfillH = tierHs[tierBackfill];
		bD.width = tierBackfillW;
		bD.height = tierBackfillH;
		var backfillScaledW = tierBackfillW * tierBackfillScale;
		var backfillScaledH = tierBackfillH * tierBackfillScale;

		// Convert current pan position from image values to tier values.
		var deltaX = Z.imageX * Z.imageZ;
		var deltaY = Z.imageY * Z.imageZ;

		// Set backfill globals for use during fast scaling.
		backfillW = backfillScaledW;
		backfillH = backfillScaledH;	
		backfillL = (displayCtrX - deltaX);
		backfillT = (displayCtrY - deltaY);
		
		// Set backfill display dimensions and position.
		if (Z.useCanvas) {
			bS.width = backfillW + "px";
			bS.height = backfillH + "px";
		}
		bS.left = backfillL + "px";
		bS.top = backfillT + "px";
	};

	function selectTiles() {
		// Calculate tiles at edges of viewport for current view then store names of tiles in view.
		var boundsDisplayTiles = getViewportDisplayBoundingBoxInTiles();
		tilesLoadingNames = [];
		for (var rowCntr = boundsDisplayTiles.top, tB = boundsDisplayTiles.bottom; rowCntr <= tB; rowCntr++) {
			for (var columnCntr = boundsDisplayTiles.left, tR = boundsDisplayTiles.right; columnCntr <= tR; columnCntr++) {
				tilesLoadingNames.push(tierCurrent + "-" + columnCntr + "-" + rowCntr);
			}
		}

		// Identify required tiles that have not been previously loaded.
		tilesLoadedNames.sort();
		tilesLoadingNames.sort();
		tilesLoadedNames = Z.Utils.removeDups(tilesLoadedNames);
		tilesLoadingNames = Z.Utils.removeDups(tilesLoadingNames);

		// Debug option: Use zDebug=2 parameter to display tiles required for new view.
		if (Z.debug == 2) { Z.Utils.trace("Tiles required: " + tilesLoadingNames.join(", ")); }

		// Identify tiles needed for current view that have been previously loaded.
		var tilesLoadingLoadedNamesIntersection = Z.Utils.intersect(tilesLoadingNames, tilesLoadedNames);
		
		// Remove previously loaded tile names to allow redisplay rather than reload.
		tilesLoadingNames = Z.Utils.subtract(tilesLoadingNames, tilesLoadedNames);
		
		// Update progress display.
		tilesToLoadTotal = tilesLoadingNamesLength = tilesLoadingNames.length;
		if (Z.ToolbarDisplay && Z.Toolbar.getInitialized()) { Z.Toolbar.updateProgress(tilesToLoadTotal, tilesLoadingNamesLength); }

		// Remove and re-add previously loaded tile names to promote so as to avoid clearing on cache validation.
		tilesLoadedNames = Z.Utils.subtract(tilesLoadedNames, tilesLoadingLoadedNamesIntersection);
		tilesLoadedNames = tilesLoadedNames.concat(tilesLoadingLoadedNamesIntersection);

		// Clear collection of tiles in current view before it is refilled in onTileLoad function.
		if (tilesLoadingNamesLength != 0) { 
			// First ensure all tiles' alpha values are set to 1 for drawing in progress and future use from cache.
			for (var i = 0, j = tilesInCurrentView.length; i < j; i++) {
				var tile = tilesInCurrentView[i];
				tile.alpha = 1;
			}
			tilesInCurrentView = []; 
		}
	};

	function redisplayCachedTiles (display, tier, cacheArray, drawMethod, delayClear, purpose) {
		if (cacheArray.length > 0) {
			// Calculate tiles at edges of viewport display for current view.
			var boundsDisplayTiles = getViewportDisplayBoundingBoxInTiles();
			
			// If using canvas browser, display temporary transition canvas while display canvas
			// is updated. In non-canvas browsers, draw directly to display, optionally using 
			// center-out order. Clear tiles previously drawn or wait until all tiles load - per parameter.
			if (!delayClear) { clearDisplay(display); }
			
			if (drawMethod == "canvasCopy") {
				clearDisplay(vD);
				vCtx.restore();
				vCtx.save();
				vCtx.scale(1, 1);
				vCtx.drawImage(tD, -displayCtrX, -displayCtrY);
				vCtx.restore();
				vCtx.save();
				vCtx.scale(tierScale, tierScale);			
			} else if (drawMethod == "centerOut") {
				// Draw from middle sorted array up & down to approximate drawing from center of view out.
				var arrayMidpoint = Math.floor(cacheArray.length / 2);
				for (var i = arrayMidpoint, j = cacheArray.length; i < j; i++) {
					var tile = cacheArray[i];
					if (tile && tile.t == tier && (tier == tierBackfill || (tile.c >= boundsDisplayTiles.left && tile.c <= boundsDisplayTiles.right && tile.r >= boundsDisplayTiles.top && tile.r <= boundsDisplayTiles.bottom))) { 
						displayTile(display, tier, tile); 
					}
					if (cacheArray.length-i-1 != i) {
						var tile = cacheArray[cacheArray.length-i-1];
						if (tile && tile.t == tier && (tier == tierBackfill || (tile.c >= boundsDisplayTiles.left && tile.c <= boundsDisplayTiles.right && tile.r >= boundsDisplayTiles.top && tile.r <= boundsDisplayTiles.bottom))) { 
							displayTile(display, tier, tile); 
						}
					}
				}
			} else { 
				// Draw simple, first to last.
				for (var i = 0, j = cacheArray.length; i < j; i++) {
					var tile = cacheArray[i];
					if (tile && tile.t == tier && (tier == tierBackfill || (tile.c >= boundsDisplayTiles.left && tile.c <= boundsDisplayTiles.right && tile.r >= boundsDisplayTiles.top && tile.r <= boundsDisplayTiles.bottom))) { 
						displayTile(display, tier, tile); 
					}
				}
			}

			// Debug option: Use zDebug=2 parameter to display tiles redisplaying.
			if (Z.debug == 2 && display.id == "viewportDisplay") { 
				var redisplayTileNames = [];
				for (var i = 0, j = cacheArray.length; i < j; i++) { 
					if (tile && cacheArray[i].t == tier && (tier == tierBackfill || (cacheArray[i].c >= boundsDisplayTiles.left && cacheArray[i].c <= boundsDisplayTiles.right && cacheArray[i].r >= boundsDisplayTiles.top && cacheArray[i].r <= boundsDisplayTiles.bottom))) { 
						redisplayTileNames.push(cacheArray[i].name);
					}						
				}
				if (redisplayTileNames.length > 0) { 
					redisplayTileNames.sort();
					redisplayTileNames = Z.Utils.removeDups(redisplayTileNames);
				}
				var redispList = (redisplayTileNames.length > 0) ? redisplayTileNames.join(", ") : "No cached tiles to redisplay";
				Z.Utils.trace("Tiles redisplaying - " + purpose + ": " + redispList);
			}
		}
	};
	
	function displayCacheDisplay (tier, cacheArray) {
		// In canvas browsers avoid blink of visible backfill as canvas is fully cleared 
		// and redrawn by first drawing cached tiles from prior view to temp canvas.
		
		// Calculate tiles at edges of viewport display for current view.
		var boundsDisplayTiles = getViewportDisplayBoundingBoxInTiles();
	
		tD.width = vD.width;
		tD.height = vD.height;
		tS.width = vS.width;
		tS.height = vS.height;
		tS.left = vS.left;		
		tS.top = vS.top;
		tCtx.restore();
		tCtx.save();
		tCtx.translate(displayCtrX, displayCtrY);
		tCtx.scale(tierScale, tierScale);
		
		for (var i = 0, j = cacheArray.length; i < j; i++) {
			var tile = cacheArray[i];
			if (tile && tile.t == tier && (tier == tierBackfill || (tile.c >= boundsDisplayTiles.left && tile.c <= boundsDisplayTiles.right && tile.r >= boundsDisplayTiles.top && tile.r <= boundsDisplayTiles.bottom))) { 
				displayTile(tD, tier, tile);
			}
		}
	};

	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::: TILE LOADING FUNCTIONS :::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
	
	function loadNewTiles (tileNamesArray, loadHandler, drawMethod, requester) {
		// Debug option: Use zDebug=2 parameter to display tiles to be requested.
		// For Zoomify Image Files (PFFs) this is contingent on offset chunk having loaded.
		var reqValue = (typeof requester !== "undefined" && requester !== null) ? " - " + requester + ": " : ": ";
		if (Z.debug == 2) { 
			if (reqValue != " - backfill: ") { Z.Utils.trace("Tiles to be loaded" + reqValue + tileNamesArray.join(", ")); }

			// Additional debugging option:
			//if (reqValue == " - backfill: ") { Z.Utils.trace("Tiles to be loaded" + reqValue + tileNamesArray.join(", ")); }
		}
	
		// Request required tiles not previously loaded.  
		if (tileNamesArray.length == 0 ) {
			// Debug option: Use zDebug=2 parameter to display no new tiles loaded.
			if (Z.debug == 2) { Z.Utils.trace("No new tiles loaded."); }		
		} else {
			var loadStart = new Date().getTime();
			if (drawMethod == "centerOut") {
				// Draw from middle sorted array up & down to approximate drawing from center of view out.
				var arrayMidpoint = Math.floor(tileNamesArray.length / 2);
				for (var i = arrayMidpoint, j = tileNamesArray.length; i < j; i++) {
					var tileName = tileNamesArray[i];
					if (tileName) {
						var tile = new Tile(tileName, requester);
						loadTile(tile, loadStart, loadHandler);
					}
					if (tileNamesArray.length-i-1 != i) {
						var tileName = tileNamesArray[tileNamesArray.length-i-1];
						if (tileName) {
							var tile = new Tile(tileName, requester);
							loadTile(tile, loadStart, loadHandler);
						}
					}
				}
			} else {
				// Draw simple, first to last.
				for (var i = 0, j = tileNamesArray.length; i < j; i++) {
					var tileName = tileNamesArray[i];
					if (tileName) {
						var tile = new Tile(tileName, requester);
						loadTile(tile, loadStart, loadHandler);
					}
				}
			}
		}
	};

	function Tile (name, requester) {
		// Values used by drawTileOnCanvas and drawTileInHTML.
		this.name = name;
		this.t = parseInt(name.substring(0, name.indexOf("-")), 10);
		this.c = parseInt(name.substring(name.indexOf("-") + 1, name.lastIndexOf("-")), 10);
		this.r = parseInt(name.substring(name.lastIndexOf("-") + 1), 10);
		this.x = Math.floor(this.c * TILE_SIZE);
		this.y = Math.floor(this.r * TILE_SIZE);
		this.image = null;
		this.alpha = 0;
		
		this.url = self.formatTilePath(this.t, this.c, this.r, requester);
		this.loadTime = null;

		// Values used only by drawTileInHTML.
		this.elmt = null;
		this.style = null;
	};

	this.formatTilePath = function (t, c, r, requester) {
		var tilePath;
		if (Z.tileSource == "ZoomifyImageFolder") {	
			// URI for each tile includes image folder path, tile group subfolder name, and tile filename.
			var offset = r * tierWInTiles[t] + c;
			for (var i = 0; i < t; i++) { offset += tierTileCounts[i]; }
			var tileGroupNum = Math.floor(offset / TILES_PER_FOLDER);
			tilePath = Z.imagePath + "/" + "TileGroup" + tileGroupNum + "/" + t + "-" + c + "-" + r + ".jpg";
			// DEV NOTE: Must cache-proof tile paths for IE pre v9 and for case of TILES_MAX_CACHE == 0. 
			// Implementing for all cases as precaution and monitoring for issue reports.  Implementing in function 
			// formatTilePath rather than in call to it because excluding PFF (image file) and third party protocol 
			// tile requests to avoid complications with server-side helper app or image server tile fulfillment.
			tilePath = Z.Utils.cacheProofPath(tilePath); 
		} else if (Z.tileSource == "ZoomifyImageFile") {
			tilePath = formatTilePathPFF(t, c, r, requester);
		} else if (Z.tileSource == "ImageServer") {
			// Example image server protocol implementation.
			tilePath = formatTilePathImageServer(t, c, r, requester);
		}		
		return tilePath;
	};

	function loadTile (tile, loadTime, loadHandler) {
		// Asynchronously load tile and ensure handler function is called upon loading.
		var tileName = tile.name;
		if (tile.url.substr(0, 8) == "skipTile") {
			skipTile(tile);
		} else if (tile.url != "offsetLoading") {	
			
			// Debug option: Use zDebug=2 parameter to display tile actually being loaded.
			if (Z.debug == 2) { Z.Utils.trace("Tile actually being loaded: " + tileName); }		
		
			tile.loadTime = loadTime;
			tile.loading = tileNetConnector.loadImage(tile.url, Z.Utils.createCallback(null, loadHandler, tile), "tile");
		} else if (tile.url == "offsetLoading") {
			var index = tilesRetry.indexOfObjectValue("name", tileName);
			if (index == -1) { tilesRetry.push(tile); }
			
			// Debug option: Use zDebug=2 parameter to display tile not being loaded yet.
			if (Z.debug == 2) { Z.Utils.trace("Tile not yet being loaded - offset chunk loading in progress: " + tileName); }	
		}
	};

	function onTileLoad (tile, image) {
		if (tile && image) {
			tile.image = image;
			var tileName = tile.name;

			// Verify loading tile is still in loading list and thus still required.  Allows for 
			// loading delays due to network latency or PFF header chunk loading.
			var index = tilesLoadingNames.indexOf(tileName);
			if (index != -1) { 
				tilesLoadingNames.splice(index, 1);
			
				// Move tile name from loading list to loaded list.
				if (TILES_MAX_CACHE > 0) {
					tilesLoaded.push(tile);
					tilesLoadedNames.push(tileName);
				}

				// Also create current view tile collection for faster zoomAndPanToView function.
				if (tilesInCurrentView.indexOf(tile) == -1) { tilesInCurrentView.push(tile); }

				// Debug option: Use zDebug=2 parameter to display tiles received.
				if (Z.debug == 2) { 
					Z.Utils.trace("Tile received: " + tile.name);				
					if (tilesLoadingNamesLength == 0) { Z.Utils.trace("Tile loading complete: all requested tiles received."); }
				}

				// Draw tile with fade-in.
				if (!fadeInInterval) { fadeInInterval = window.setInterval(fadeInIntervalHandler, 50); }

				// Determine if all new tiles have loaded.
				var tilesLoadingNamesLength = tilesLoadingNames.length;			
				if (tilesLoadingNamesLength == 0) {	

					// Fully clear and redraw viewport display if canvas in use. If using canvas browser, 
					// display temporary transition canvas while display canvas is updated.
					if (Z.useCanvas && (TILES_MAX_CACHE > 0)) {
						if (!tierChanged) {
							redisplayCachedTiles(vD, tierCurrent, tilesLoaded, "centerOut", false, "4. Updating view: all new tiles loaded"); 
						} else {
							displayCacheDisplay(tierCurrent, tilesLoaded);
							redisplayCachedTiles(vD, tierCurrent, tilesLoaded, "canvasCopy", false, "4. Updating view: all new tiles loaded"); 
							var transitionTimer = window.setTimeout( function() { clearDisplay(tD); }, 200);
							tierChanged = false;
						}
					}

					// Verify tiles cached in loaded list are under allowed maximum.
					if (tilesLoadedNames.length > TILES_MAX_CACHE) { validateCache(); }

					// Update value for toolbar progress display.
					tilesToLoadTotal = 0; 
				}

				// Update progress display if enabled.
				if (Z.ToolbarDisplay && Z.Toolbar.getInitialized()) { Z.Toolbar.updateProgress(tilesToLoadTotal, tilesLoadingNamesLength); }

			}
		} else if (image == null) {
			if (Z.mobileDevice) {
				console.log(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			}
		}
	};

	function onTileBackfillLoad (tile, image) {
		if (tile && image) {
			tile.image = image;
			var tileName = tile.name;

			// Move tile name from loading list to loaded list.
			tilesBackfillLoaded.push(tile);
			var index = tilesBackfillLoadingNames.indexOf(tileName);
			if (index != -1) { tilesBackfillLoadingNames.splice(index, 1); }
			if (Z.tileSource == "ZoomifyImageFile") { 
				var index2 = tilesBackfillRetryNames.indexOf(tileName);
				if (index2 != -1) { tilesBackfillRetryNames.splice(index2, 1); } 
			}
			
			// No backfill fade-in necessary. Tiles precached and load behind main display or outside view area.
			tile.alpha = 1; 
						
			// Draw tile if in current backfill tier, otherwise it will be drawn from cache when needed.
			if (tile.t == tierBackfill ) { displayTile(bD, tierBackfill, tile); }

			// Debug option: Uncomment lines below and use zDebug=2 parameter to backfill tiles received.
			/* if (Z.debug == 2) { 
				Z.Utils.trace("Tiles received - backfill: " + tile.name); 
				if (tilesBackfillLoadingNames.length == 0) { Z.Utils.trace("Tile loading complete for backfill: all requested tiles received."); }
			} */

		} else if (image == null) {
			if (Z.mobileDevice) {
				console.log(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			}
		}
	};

	function onTileLoadWhilePanning (tile, image) {
		if (tile && image) {
			tile.image = image;
			var tileName = tile.name;
			displayTile(vD, tierCurrent, tile);
		} else if (image == null) {
			if (Z.mobileDevice) {
				console.log(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_TILEPATHINVALID") + tile.name + ".jpg");
			}
		}
	};
		
	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::: DRAWING FUNCTIONS :::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
	
	function fadeInIntervalHandler(event) {			
		var completeCount = 0;
		for (var i = 0, j = tilesInCurrentView.length; i < j; i++) {
			var tile = tilesInCurrentView[i];
			if (tile.t == tierCurrent) { 
				if (fadeInStep != 0 && tile.alpha + fadeInStep < 1) { 
					tile.alpha += fadeInStep;
				} else {
					tile.alpha = 1; 
					completeCount++;	
				}	
				
				// DEV NOTE: Draws tiles in view if any tile new. Allows for loading delays but may draw redundantly on rapid small pans.
				displayTile(vD, tierCurrent, tile);
				
				if (completeCount >= j) {
					window.clearInterval(fadeInInterval);
					fadeInInterval = null;
					i = j;
				}				
			} else {
				tilesInCurrentView.splice(i, 1);
				var index = tilesLoadingNames.indexOf(tile.name);
				if (index != -1) { tilesLoadingNames.splice(index, 1); }
				j--;
			}
		}	
	};	

	function displayTile (display, tier, tile) {			
		// Draw tile on screen using canvas or image elements as appropriate to browser support.  Apply
		// zoom of current tier to imageX and Y but do not apply scale of current tier as that scaling is function
		// of the context or container object. Do not display tile if tile has been skipped (see skipTile function notes).
		if (tile.url.substr(0, 8) != "skipTile") {
			var x = tile.x;
			var y = tile.y;	
			var tierCurrentZoomUnscaled = convertTierScaleToZoom(tier, 1);
			if (Z.useCanvas) {
				if (display == vD || display == tD) {
					x -= (Z.imageX * tierCurrentZoomUnscaled);
					y -= (Z.imageY * tierCurrentZoomUnscaled);			
				} 
				drawTileOnCanvas(display, tile, x, y);
			} else {
				var scale;
				if (display == vD) {
					x -= ((Z.imageX * tierCurrentZoomUnscaled) - (displayCtrX / tierScale));
					y -= ((Z.imageY * tierCurrentZoomUnscaled) - (displayCtrY / tierScale));
					scale = tierScale;
				} else {
					scale = tierBackfillScale;
				}
				drawTileInHTML(display, tile, x, y, scale);
			}
		}
	};
	
	function drawTileOnCanvas (container, tile, x, y) {
		// Debug option: Uncomment next two lines to display tile borders.
		//x += tile.c;
		//y += tile.r;
		
		var containerCtx = container.getContext("2d");		
		if (Z.alphaSupported && tile.alpha < 1 && container.id != "transitionDisplay") { 
			containerCtx.globalAlpha = tile.alpha; 
			containerCtx.drawImage(tile.image, x, y);
			containerCtx.globalAlpha = 1;
		} else {
			containerCtx.drawImage(tile.image, x, y);
		}
		
		// If in debug mode 2, add tile name to tile.
		if (Z.debug == 2) { drawTileNameOnTile(container, tile.name, x, y, tierScale); }
	};

	function drawTileInHTML (container, tile, x, y, scale) {
		if (!tile.elmt) { // Simple test is OK because tile.elmt will not be numeric and thus not 0.
			tile.elmt = Z.Utils.createContainerElement("img");
			tile.elmt.onmousedown = Z.Utils.preventDefault; // Disable individual tile mouse-drag.
			Z.Utils.addEventListener(tile.elmt, "contextmenu", Z.Utils.preventDefault);
			tile.elmt.src = tile.url;
			tile.style = tile.elmt.style;
			tile.style.position = "absolute";
			Z.Utils.renderQuality (tile, Z.renderQuality);
			if (Z.cssTransformsSupported) { tile.style[Z.cssTransformProperty + "Origin"] = "0px 0px"; }
		}
		if (tile.elmt.parentNode != container) { container.appendChild(tile.elmt); }
		var tS = tile.style;
		
		// Speed redraw by hiding tile to avoid drawing on each change (width, height, left, top).
		tS.display = "none"; 
		
		if (Z.cssTransformsSupported) {
			// Backfill in non-IE browsers.
			tS[Z.cssTransformProperty] = ['matrix(', (tile.image.width / tile.elmt.width * scale).toFixed(8), ',0,0,', (tile.image.height / tile.elmt.height * scale).toFixed(8), ',', (x * scale).toFixed(8), Z.cssTransformNoUnits ? ',' : 'px,', (y * scale).toFixed(8), Z.cssTransformNoUnits ? ')' : 'px)'].join('');
		} else {
			// Backfill and frontfill in IE without canvas support.
			tS.width = (tile.image.width * scale) + "px";
			tS.height = (tile.image.height * scale) + "px";
			tS.left = (x * scale) + "px";
			tS.top = (y * scale) + "px";
		}
		
		// Unhide tile.
		tS.display = "inline-block";
					
		// Set alpha to fade-in tile if supported.
		Z.Utils.setOpacity(tile, tile.alpha);

		// Debug option: Uncomment next two lines to display tile borders.
		//tile.elmt.style.borderStyle = "solid";
		//tile.elmt.style.borderWidth = "1px";
		
		// If in debug mode 2, add tile name to tile.
		if (Z.debug == 2) { drawTileNameOnTile(container, tile.name, x, y, scale); }
	};
	
	function drawTileNameOnTile (container, tileName, x, y, scale) { 
		if (Z.useCanvas) {
			drawTileNameOnCanvas (container, tileName, x, y, scale);
		} else {
			drawTileNameInHTML(container, tileName, x, y, scale);
		}
	};
	
	function drawTileNameOnCanvas (container, tileName, x, y, scale) {
		// Get font size constraints.
		var defaultFontSize = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTCAPTIONFONTSIZE"), 10);
		var minFontSize = parseInt(Z.Utils.getResource("DEFAULT_MINHOTSPOTCAPTIONFONTSIZE"), 10);
		var maxFontSize = parseInt(Z.Utils.getResource("DEFAULT_MAXHOTSPOTCAPTIONFONTSIZE"), 10);
		var scaledFontSize = Math.round(defaultFontSize * scale);
		var constrainedFontSize = 2 * (( scaledFontSize < minFontSize) ? minFontSize : (( scaledFontSize > maxFontSize) ? maxFontSize : scaledFontSize));
		
		// Get canvas context and set font style.
		var vpdCtx = container.getContext("2d");
		vpdCtx.font = constrainedFontSize + "px verdana";
		vpdCtx.textAlign = "left";
		vpdCtx.textBaseline = "top";
		
		// Calculate tile x and y offsets to center on scaled tile.
		var tileNameOffset = TILE_SIZE * scale / 2;
		
		// Draw tile name white.
		vpdCtx.fillStyle = "#ffffff";		
		vpdCtx.fillText(tileName, x + tileNameOffset, y + tileNameOffset);
		
		// Draw tile name black.
		vpdCtx.fillStyle = "#000000";	
		vpdCtx.fillText(tileName, x + tileNameOffset + 1, y + tileNameOffset + 1);
	};
	
	function drawTileNameInHTML (container, tileName, x, y, scale) {
		// Get font size constraints.
		var defaultFontSize = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTCAPTIONFONTSIZE"), 10);
		var minFontSize = parseInt(Z.Utils.getResource("DEFAULT_MINHOTSPOTCAPTIONFONTSIZE"), 10);
		var maxFontSize = parseInt(Z.Utils.getResource("DEFAULT_MAXHOTSPOTCAPTIONFONTSIZE"), 10);
		var scaledFontSize = Math.round(defaultFontSize * scale);
		var constrainedFontSize = 2 * (( scaledFontSize < minFontSize) ? minFontSize : (( scaledFontSize > maxFontSize) ? maxFontSize : scaledFontSize));

		// Create caption text node and container, and set font style.
		var padding = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTCAPTIONPADDING"), 10) * scale;

		// Draw tile name white.
		var tileNameTextBox = Z.Utils.createContainerElement("div", "tileNameTextBox", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "none", "0px", "transparent none", "0px", padding + "px", "nowrap");
		var tileNameTextNode = document.createTextNode(tileName);
		tileNameTextBox.appendChild(tileNameTextNode);
		container.appendChild(tileNameTextBox);
		Z.Utils.setTextStyle(tileNameTextNode, "white", "verdana", constrainedFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");

		// Draw tile name black.
		var tileNameTextBox2 = Z.Utils.createContainerElement("div", "tileNameTextBox2", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "none", "0px", "transparent none", "0px", padding + "px", "nowrap");
		var tileNameTextNode2 = document.createTextNode(tileName);
		tileNameTextBox2.appendChild(tileNameTextNode2);
		container.appendChild(tileNameTextBox2);
		Z.Utils.setTextStyle(tileNameTextNode2, "black", "verdana", constrainedFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");

		// Position tile name. Must occur after added to display because text container width setting is 'auto'.
		var padding = parseFloat(tileNameTextBox.style.padding);
		var computedW = parseFloat(Z.Utils.getElementStyleProperty(tileNameTextBox, "width"));
		if (isNaN(computedW)) {
			// Workaround for IE failure to report text container element width if setting is 'auto'.
			var font2Pixels = parseFloat(Z.Utils.getResource("DEFAULT_FONTTOPIXELSCONVERSIONFACTOR"));
			var ratioPixs2Chars = parseFloat(tileNameTextBox.style.fontSize) / font2Pixels;
			computedW = Math.round(parseFloat(tileName.length * ratioPixs2Chars));
		}
		var tileScaledW = TILE_SIZE * scale / 2;
		var tileScaledH = TILE_SIZE * scale / 2;
		tileNameTextBox.style.left = ((x * scale) + ((tileScaledW - (computedW / 2)) - padding)) + "px";
		tileNameTextBox.style.top = ((y * scale) + tileScaledH) + "px";
		tileNameTextBox2.style.left = (1 + (x * scale) + ((tileScaledW - (computedW / 2)) - padding)) + "px";
		tileNameTextBox2.style.top = (1 + (y * scale) + tileScaledH) + "px";
	
		// Prevent text selection and context menu.
		Z.Utils.addEventListener(tileNameTextBox, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.disableTextInteraction(tileNameTextNode);
		Z.Utils.addEventListener(tileNameTextBox2, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.disableTextInteraction(tileNameTextNode2);
	};	
	
	function validateCache () {
		// Clear cached tile names and tiles until under allowed maximum, allowing for different array orders.
		while (tilesLoadedNames.length > TILES_MAX_CACHE && tilesLoaded.length > 0) {
			j = tilesLoadedNames.indexOf(tilesLoaded[0].name);
			if (j != -1) { tilesLoadedNames.splice(j, 1); }
			tilesLoaded.splice(0, 1);
		}
	};

	function clearDisplay (display) {
		// Completely clear viewport including prior tiles better than backfill. Subsequent redraw
		// of new tiles will leave gaps with backfill showing rather than tiles from prior view.
		if (display) {
			if (Z.useCanvas && display.tagName == "CANVAS") {
				var displayCtx = display.getContext("2d");
				displayCtx.save();
				displayCtx.setTransform(1,0,0,1,0,0);
				displayCtx.clearRect(0,0,displayCtx.canvas.width,displayCtx.canvas.height);
				displayCtx.restore();
			} else {
				while (display.hasChildNodes()) {
				 	display.removeChild(display.lastChild); 
				}
			}
		}
	};

	
	
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::: ZOOMIFY IMAGE FILE (PFF) STORAGE FUNCTIONS ::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	function formatTilePathPFF (t, c, r, requester) {
		// Tile path is actually tile request to servlet or other server-side helper application.
		// Tile request is set to "offsetLoading" if new header offset chunk must be loaded from PFF.
		// Tile request otherwise includes image file path, request type, begin byte, end byte, image version, and header size.
		// Request types include: 1 = image file header, 2 = header offset chunk, 0 = image tile.

		var tilePath = "offsetLoading";
		
		var currentOffsetIndex = 0;
		var currentOffsetIndexBegin = 0;
		var currentOffsetChunk;
		var currentOffsetChunkBegin;
		var offsetChunkIndex;
		var offsetChunkIndexBegin;
		var offsetChunkBeginByte;
		var offsetChunkEndByte;
		var offsetChunkBeginBeginByte;
		var offsetChunkBeginEndByte;

		for (var tierCntr = tierCount - 1; tierCntr > t; tierCntr--) {
			currentOffsetIndex += tierTileCounts[tierCntr];
		}

		currentOffsetIndex += r * tierWInTiles[t] + c;
		currentOffsetChunk = Math.floor(currentOffsetIndex / CHUNK_SIZE);
		currentOffsetIndexBegin = (currentOffsetIndex - 1 == -1) ? 0 : currentOffsetIndex - 1;
		currentOffsetChunkBegin = Math.floor(currentOffsetIndexBegin / CHUNK_SIZE);
		
		if (offsetChunks[currentOffsetChunk] == undefined || offsetChunks[currentOffsetChunk] == "offsetLoading" || offsetChunks[currentOffsetChunkBegin] == undefined || offsetChunks[currentOffsetChunkBegin] == "offsetLoading") {
			var tileRetryString = currentOffsetChunk + "," + t +"," + c +"," + r + "," + requester;
			if (tilesRetryNamesChunks.indexOf(tileRetryString) == -1) { tilesRetryNamesChunks.push(tileRetryString); }

			// Debug option: Use zDebug=2 parameter to display tiles being requested now that offset chunks are available.
			if (Z.debug == 2) { Z.Utils.trace("Tile recorded for load retry after load chunk: " + currentOffsetChunk + "," + t +"," + c +"," + r + "," + requester); }

			// No redundant offset loads if call already in progress (element would be 'offsetLoading', not undefined).
			if (offsetChunks[currentOffsetChunk] == undefined) {
				offsetChunks[currentOffsetChunk] = "offsetLoading";
				offsetChunkBeginByte = HEADER_SIZE_TOTAL + CHUNK_SIZE * currentOffsetChunk * 8;
				offsetChunkEndByte = offsetChunkBeginByte + CHUNK_SIZE * 8;
				loadOffsetChunk(offsetChunkBeginByte, offsetChunkEndByte, currentOffsetChunk);
			}
			// No redundant offset loads if this chunk would be same as above (element would be 'offsetLoading', not undefined).
			if (offsetChunks[currentOffsetChunkBegin] == undefined) {
				offsetChunks[currentOffsetChunkBegin] = "offsetLoading";
				offsetChunkBeginBeginByte = HEADER_SIZE_TOTAL + CHUNK_SIZE * currentOffsetChunkBegin * 8;
				offsetChunkBeginEndByte = offsetChunkBeginBeginByte + CHUNK_SIZE * 8;
				loadOffsetChunk(offsetChunkBeginBeginByte, offsetChunkBeginEndByte, currentOffsetChunk);
			}
		} else {
			var absoluteBeginning = Math.floor(offsetChunks[currentOffsetChunk][0]);
			var absoluteBeginningBegin = Math.floor(offsetChunks[currentOffsetChunkBegin][0]);
			var offsetString = offsetChunks[currentOffsetChunkBegin][1];
			var offsetString2 = offsetChunks[currentOffsetChunk][1];
			offsetChunkIndexBegin = 9 * (currentOffsetIndexBegin % CHUNK_SIZE);
			var tempInt = Math.floor(parseFloat(offsetString.substring(offsetChunkIndexBegin, offsetChunkIndexBegin + 9)));
			offsetChunkIndex = 9 * (currentOffsetIndex % CHUNK_SIZE);
			var tempInt2 = Math.floor(parseFloat(offsetString2.substring(offsetChunkIndex, offsetChunkIndex + 9)));
			var sByte = (currentOffsetIndex == 0) ? HEADER_SIZE_TOTAL + TILE_COUNT * 8 : absoluteBeginningBegin + tempInt;
			var eByte = absoluteBeginning + tempInt2;

			if ((eByte - sByte) > 0) {
				tilePath = Z.tileHandlerPathFull + "?file=" + Z.imagePath + "&requestType=0&begin=" + sByte.toString() + "&end=" + eByte.toString() + "&vers=" + IMAGE_VERSION.toString() + "&head=" + HEADER_SIZE.toString();
			} else {
				tilePath = "skipTile:" + t + "-" + c + "-" + r;
			}
		}			
		
		return tilePath;
	};

	function loadOffsetChunk (offsetStartByte, offsetEndByte, chunk) {		
		offsetChunkBegins[offsetStartByte] = chunk;
		var REQUEST_TYPE = 2; // 1 = header, 2 = offset, 0 = tile.
		
		// Build data request with query string and send.
		var imgPathNoDot = Z.imagePath.replace(".", "%2E");  // Required for servlet.
		var offsetChunkPath = Z.tileHandlerPathFull + "?file=" + imgPathNoDot + "&requestType=" + REQUEST_TYPE + "&begin=" + offsetStartByte + "&end=" + offsetEndByte;
		var netConnector = new Z.NetConnector();			
		netConnector.loadXML(offsetChunkPath);
	};

	this.parseOffsetChunk = function (xmlDoc) {	
		var begin = parseInt(xmlDoc.documentElement.getAttribute("BEGIN"), 10);
		var replyData = xmlDoc.documentElement.getAttribute("REPLYDATA");		
		var chunk = offsetChunkBegins[begin];
		var offsetOfCurrentChunkBegin = Math.floor(((begin - HEADER_SIZE_TOTAL) / 8) / CHUNK_SIZE);
		offsetChunks[offsetOfCurrentChunkBegin] = new Array();
		offsetChunks[offsetOfCurrentChunkBegin] = replyData.split(",", 2);	
		
		selectTilesRetry(chunk);
	
		// Debug options:
		//Z.Utils.trace("parseOffsetChunk-begin + replyData + chunk: " + begin + "  " + replyData + "  " + chunk);
		//Z.Utils.trace("parseOffsetChunk-offsetChunks[offsetOfCurrentChunkBegin][0] & [1]: " + offsetChunks[offsetOfCurrentChunkBegin][0] + ", " + offsetChunks[offsetOfCurrentChunkBegin][1]);
	};	
	
	function selectTilesRetry (chunk) {
		// Debug option: Use zDebug=2 parameter to display offset chunk for which tiles are to be retried.
		if (Z.debug == 2) { Z.Utils.trace("In selectTilesRetry-chunk received: " + chunk); }	
		
		for(var i = 0, j = tilesRetryNamesChunks.length; i < j; i++) {
			var tilesRetryElements = tilesRetryNamesChunks[i].split(',');
			if (tilesRetryElements[0] == chunk) {					
				if (tilesRetryElements[4] !== undefined && tilesRetryElements[4] != "backfill") {
					tilesRetryNames.push(tilesRetryElements[1] + "-" + tilesRetryElements[2] + "-" + tilesRetryElements[3]); // t,c,r
				} else if (tilesRetryElements[4] == "backfill") {
					tilesBackfillRetryNames.push(tilesRetryElements[1] + "-" + tilesRetryElements[2] + "-" + tilesRetryElements[3]); // t,c,r
				}
				tilesRetryNamesChunks.splice(i, 1);
				i--;
				j--;
			}
		}
		
		if (tilesRetryNames.length > 0) {
			tilesRetryNames.sort();
			tilesRetryNames = Z.Utils.removeDups(tilesRetryNames);
					
			// Debug option: Use zDebug=2 parameter to display tiles being requested now that offset chunks are available.
			if (Z.debug == 2) { Z.Utils.trace("Tiles being requested - offset chunk now loaded: " + tilesRetryNames.join(", ")); }	

			loadNewTilesRetry(tilesRetryNames, onTileLoad, "simple", "display");
		}
		if (tilesBackfillRetryNames.length > 0) {
			tilesBackfillRetryNames.sort();
			tilesBackfillRetryNames = Z.Utils.removeDups(tilesBackfillRetryNames);
		
			loadNewTilesRetry(tilesBackfillRetryNames, onTileBackfillLoad, "simple", "backfill");
		}
	};
	
	function loadNewTilesRetry (tileNamesArray, loadHandler, drawMethod, requester) {
		var loadStart = new Date().getTime();
		
		for (var i = 0, j = tileNamesArray.length; i < j; i++) {
			var tile = null;
			var tileName = tileNamesArray[i];
			if (tileName) {
				tileNamesArray.splice(i, 1);
				i--;
				j--; 
				index = tilesRetry.indexOfObjectValue("name", tileName);
				if (index != -1) {				
					tile = tilesRetry[index];
					tilesRetry.splice(index, 1);
					tile.url = self.formatTilePath(tile.t, tile.c, tile.r, requester);				
				} else {
					tile = new Tile(tileName, requester);
				}
			
				if (tile != null) {
					// Debug option: Use zDebug=2 parameter to display tile for which to retry loading.
					if (Z.debug == 2) { Z.Utils.trace(tile.name + "  " + tile.url + "  " + tile.image); }	

					loadTile(tile, loadStart, loadHandler);
				}
			}
		}
	};
	
	function skipTile (tile) {
		// Tiles to skip are tiles not captured at a particular position in an image at a particular resolution.  This
		// typically results from microscopy scanning to create a Zoomify Image File (PFF) where only areas of
		// primary interest are scanned at high resolution while in other areas the lower resolution backfill image 
		// tiles are allowed to show through. For these tiles, the PFF offset chunks will have a byte range for the
		// tile that is 0 bytes in length. This approach results in more efficient storage and bandwidth use.
		// Skipped tiles are not loaded but are added to tile cache to prevent redundant future loading attempts. 
		
		// Debug option: Use next line to trace tiles not requested due to sparse PFF tile feature.
		// console.log("Tile skipped: " + tile.name);
		
		if (TILES_MAX_CACHE > 0) {
			tilesLoaded.push(tile);
			tilesLoadedNames.push(tile.name);
		}
		var index = tilesLoadingNames.indexOf(tile.name);
		if (index != -1) { tilesLoadingNames.splice(index, 1); }
		if (Z.tileSource == "ZoomifyImageFile") { 
			var index2 = tilesRetryNames.indexOf(tile.name);
			if (index2 != -1) { tilesRetryNames.splice(index2, 1); } 
		}
		tilesInCurrentView.push(tile);		
	};

	
	
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::: EXAMPLE IMAGE SERVER STORAGE FUNCTIONS :::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	function formatTilePathImageServer (t, c, r, requester) {		
		// Example image server protocol implementation: the following steps support the tile 
		// request protocol of one popular image server, the Slide Path Digital Slide Server.

		// Get file type from image path filename extension. Two options in example implementation.
		var fileType = (Z.imagePath.toLowerCase().indexOf(".svs") != -1) ? "svs" : (Z.imagePath.toLowerCase().indexOf(".ndpi") != -1) ? "ndpi": null;
		
		// Convert Viewer x, y, and zoom values to protocol of example image server.
		var zoom = convertViewerZoomToImageServerZoom();
		var x = Z.imageX * Z.imageZ;
		var y = Z.imageY * Z.imageZ;
		
		// DEV NOTE: Example implementation requires additional value.
		var miscValue = 1;
		
		tilePath = Z.tileHandlerPathFull + "?FIF=" + Z.imagePath + "&focal=" + Z.focal + "&QLT=" + Z.quality + "&DSTL=" + x + "," + y + "," + TILE_SIZE + "," + TILE_SIZE + "," + zoom + "," + miscValue + "&type=" + fileType;
		
		// Debugging option: above example tilePath traced for review and then replaced
		// with substitute value to display Zoomify Logo for visual assessment of placement.
		Z.Utils.trace(tilePath);
		tilePath = "Assets/Skins/Default/standard/toolbarLogo.png";
		
		// Example tile path values for example image server implementation:
		// "http://slides.myDomain.com/fcgi-bin-dss/dss.fcgi?FIF=/Images/myImage1.svs&focal=1&QLT=55&DSTL=1,1,512,512,100,1&type=svs"		
		// "http://slides.myDomain.com/fcgi-bin-dss/dss.fcgi?FIF=/Images/myImage2.ndpi&focal=1&QLT=55&DSTL=1,1,512,512,100,1&type=ndpi"
	
		return tilePath;
	};
	
	function convertViewerZoomToImageServerZoom () {
		// Example image server protocol implementation: the following steps support the tile 
		// request protocol of one popular image server, the Slide Path Digital Slide Server.
		// Zoom values are inverted relative to Zoomify range, and limited to discreet tiers.
		var zoomifyZ = Z.imageZ * 100;
		var maxScaleUp = TIERS_MAX_SCALE_UP;
		var imageServerZ;
		
		if (Z.sourceMagnification == 40) {
			// 100%=1=40x, 50%=2=20x, 25%=4=10x, 10%=8=4x, 5%=16=2x, 2.5%=32=1x.
			if (zoomifyZ <= 2.5 + maxScaleUp) {
				imageServerZ = 32;
			} else if (zoomifyZ <= 5 + maxScaleUp) {
				imageServerZ = 16;			
			} else if (zoomifyZ <= 10 + maxScaleUp) {
				imageServerZ = 8;			
			} else if (zoomifyZ <= 25 + maxScaleUp) {
				imageServerZ = 4;			
			} else if (zoomifyZ <= 50 + maxScaleUp) {
				imageServerZ = 2;			
			} else {
				imageServerZ = 1;			
			}
		} else if (Z.sourceMagnification == 20) {
			// 100%=1=20x, 50%=2=10x, 20%=4=4x, 10%=8=2x, 5%=16=1x.
			if (zoomifyZ <= 5 + maxScaleUp) {
				imageServerZ = 16;			
			} else if (zoomifyZ <= 10 + maxScaleUp) {
				imageServerZ = 8;			
			} else if (zoomifyZ <= 20 + maxScaleUp) {
				imageServerZ = 4;			
			} else if (zoomifyZ <= 50 + maxScaleUp) {
				imageServerZ = 2;			
			} else {
				imageServerZ = 1;		
			}			
		}	
			
		return imageServerZ;
	};
	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::: CALCULATION & CONVERSTION FUNCTIONS :::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
	
	function getViewportBoundingBoxInTiles () {
		// Get bounding box in image tiles for current view.
		return new BoundingBoxInTiles(getViewportBoundingBoxInPixels(), tierCurrent);
	};

	function getViewportDisplayBoundingBoxInTiles () {
		// Get bounding box in image tiles for current view.
		return new BoundingBoxInTiles(getViewportDisplayBoundingBoxInPixels(), tierCurrent);
	};	

	function getViewportBoundingBoxInPixels () {
		// Get bounding box coordinates in image pixels for current view.

		// Allow for pan in progress via movement of display.
		var canvasOffsetL = parseFloat(cS.left) - displayL;
		var canvasOffsetT = parseFloat(cS.top) - displayT;

		// Allow for CSS scaling calculations.
		if (Z.useCanvas) {
			var cssScale = parseFloat(cS.width) / cD.width;
			canvasOffsetL /= cssScale;
			canvasOffsetT /= cssScale;
		}

		// Convert offset pixels of any pan in progress to image pixels.
		var currentZ = self.getZoom();
		if (canvasOffsetL != 0) { canvasOffsetL /= currentZ; }
		if (canvasOffsetT != 0) { canvasOffsetT /= currentZ; }
		
		var x = Z.imageX - canvasOffsetL;
		var y = Z.imageY - canvasOffsetT;
		var left = -(viewW / 2);
		var top = viewW / 2;
		var right = -(viewH / 2);
		var bottom = (viewH / 2);

		return new BoundingBoxInPixels(x, y, left, top, right, bottom, currentZ);
	};

	function getViewportDisplayBoundingBoxInPixels () {
		// Get bounding box coordinates in image pixels for current view plus pan buffer border area.

		// Allow for pan in progress via movement of display.
		var canvasOffsetL = parseFloat(cS.left) - displayL;
		var canvasOffsetT = parseFloat(cS.top) - displayT;

		// Allow for CSS scaling calculations.
		if (Z.useCanvas) {
			var cssScale = parseFloat(cS.width) / cD.width;
			canvasOffsetL /= cssScale;
			canvasOffsetT /= cssScale;
		}

		// Convert offset pixels of any pan in progress to image pixels.
		var currentZ = self.getZoom();
		if (canvasOffsetL != 0) { canvasOffsetL /= currentZ; }
		if (canvasOffsetT != 0) { canvasOffsetT /= currentZ; }
		
		var x = Z.imageX - canvasOffsetL;
		var y = Z.imageY - canvasOffsetT;
		var left = -(displayW / 2);
		var top = displayW / 2;
		var right = -(displayH / 2);
		var bottom = displayH / 2;

		return new BoundingBoxInPixels(x, y, left, top, right, bottom, currentZ);
	};

	function BoundingBoxInTiles (pixelsBoundingBox, tCurr) {
		// Caculate edges of view in image tiles of the current tier.
		var tierCurrentZoomUnscaled = convertTierScaleToZoom(tCurr, 1);
		var viewTileL = Math.floor(pixelsBoundingBox.left * tierCurrentZoomUnscaled / TILE_SIZE);
		var viewTileR = Math.floor(pixelsBoundingBox.right * tierCurrentZoomUnscaled / TILE_SIZE);
		var viewTileT = Math.floor(pixelsBoundingBox.top * tierCurrentZoomUnscaled / TILE_SIZE);
		var viewTileB = Math.floor(pixelsBoundingBox.bottom * tierCurrentZoomUnscaled / TILE_SIZE);
		
		// Constrain edge tile values to existing columns and rows.
		if (viewTileL < 0) { viewTileL = 0; }
		if (viewTileR > tierWInTiles[tierCurrent] - 1) { viewTileR = tierWInTiles[tierCurrent] - 1; }
		if (viewTileT < 0) { viewTileT = 0; }
		if (viewTileB > tierHInTiles[tierCurrent] - 1) { viewTileB = tierHInTiles[tierCurrent] - 1; }

		this.left = viewTileL;
		this.right = viewTileR;
		this.top = viewTileT;
		this.bottom = viewTileB;
	};

	function BoundingBoxInPixels (x, y, vpPixelsLeft, vpPixelsRight, vpPixelsTop, vpPixelsBottom, zoom) {
		// Convert any bounding box from viewport pixels to image pixels.
		this.left = x + (vpPixelsLeft / zoom);
		this.right = x + (vpPixelsRight / zoom);
		this.top = y + (vpPixelsTop / zoom);
		this.bottom = y + (vpPixelsBottom / zoom);
	};

	function convertPageCoordsToViewportCoords (pagePixelX, pagePixelY) {
		var vpPixelX = pagePixelX - Z.Utils.getElementPosition(Z.ViewerDisplay).x;
		var vpPixelY = pagePixelY - Z.Utils.getElementPosition(Z.ViewerDisplay).y;
		return new Z.Utils.Point(vpPixelX, vpPixelY);
	};

	function convertViewportCoordsToImageCoords (viewportX, viewportY) {
		// Calculate current viewport center.
		var viewportCtrX = parseFloat(cS.left) + displayCtrX;
		var viewportCtrY = parseFloat(cS.top) + displayCtrY;

		// Calculate delta of input values from viewport center.
		var viewportDeltaX = viewportX - viewportCtrX;
		var viewportDeltaY = viewportY - viewportCtrY;

		// Scale delta to convert from viewport to image coordinates.
		var imageDeltaX = viewportDeltaX / Z.imageZ;
		var imageDeltaY = viewportDeltaY / Z.imageZ;

		// Combine with current image position to get image coordinates.
		var imageX = Z.imageX + imageDeltaX;
		var imageY = Z.imageY + imageDeltaY;

		return new Z.Utils.Point(imageX, imageY);
	};

	function convertImageCoordsToViewportCoords (imageX, imageY, imageZ) {
		// Calculate delta of input values from current image position.
		var imageDeltaX = Z.imageX - imageX;
		var imageDeltaY = Z.imageY - imageY;

		// Scale delta to convert from image to viewport coordinates.
		var viewportDeltaX = imageDeltaX * imageZ;
		var viewportDeltaY = imageDeltaY * imageZ;
		
		// Convert display current to viewport target.
		var displayTargetL = displayL + viewportDeltaX;
		var displayTargetT = displayT + viewportDeltaY;
				
		return new Z.Utils.Point(displayTargetL, displayTargetT);
	};
	
	function calculateZoomDecimalToFitDisplay () {
		// Determine zoom to exactly fit image within viewport.
		return (Z.imageW / Z.imageH > viewW / viewH) ? viewW / Z.imageW : viewH / Z.imageH;
	};

	function convertTierScaleToZoom (tier, scale) {
		var zoom = scale * (tierWs[tier] / Z.imageW);
		return zoom;
	};

	function convertZoomToTierScale (tier, zoom) {
		var scale = zoom / (tierWs[tier] / Z.imageW);
		return scale;
	};
	
	

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::: CONSTRAIN & SYNC FUNCTIONS :::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::		

	function constrainPanByImageCoordinates (newCtrX, newCtrY, zoom) {	
		// Preemptively limit new coordinates to ensure image will not be panned out of view. This function
		// is used when coordinates are directly set using the view, setView, or zoomAndPanToView functions.
		// Calls require that default pan constraint not be overridden by parameter or that zoom value is provided.
		if (Z.constrainPan) {
			if (zoom === null) { zoom = Z.imageZ; }
			
			var vpBoundsInImagePixels = new BoundingBoxInPixels(newCtrX, newCtrY, -(viewW / 2), (viewW / 2), -(viewH / 2), (viewH / 2), zoom);
			var viewL = vpBoundsInImagePixels.left;
			var viewR = vpBoundsInImagePixels.right;
			var viewT = vpBoundsInImagePixels.top;
			var viewB = vpBoundsInImagePixels.bottom;
			if (Z.imageW * zoom > viewW) {
				if (viewL < 0) {
					newCtrX = viewW / 2 / zoom;   // Zoomed in, limit pan right.
				} else if (viewR > Z.imageW) {
					newCtrX = Z.imageW - viewW / 2 / zoom;   // Zoomed in, limit pan left.
				}
			} else {
				newCtrX = Z.imageW / 2;  // Zoomed out, center image.
			}
			if (Z.imageH * zoom > viewH) {
				if (viewT < 0) {
					newCtrY = viewH / 2 / zoom;   // Zoomed in, limit pan down.
				} else if (viewB > Z.imageH) {
					newCtrY = Z.imageH - viewH / 2 / zoom;   // Zoomed in, limit pan up.
				}
			} else {
				newCtrY = Z.imageH / 2;    // Zoomed out, center image.
			}
		}
		return new Z.Utils.Point(newCtrX, newCtrY);
	};

	function constrainPanByViewportDisplayCoordinates (newL, newT) {
		// Modify new viewer display position to ensure image is in view. This function is used
		// during zoom-out to ensure display scaling is centered within view area.  Repositioning
		// of the display occurs within the viewport container at its current size and position.
		// Container and display size and and position are then reset in the resetDisplays
		// function in the updateView function, after zoom-out ends.
		if (Z.constrainPan) {
			// Calculate current zoom as scaling progresses. Note that no adjustment to 
			// imageX and imageY values is needed as in other constrainPan functions 
			// because this function is used when view is being scaled, not panned.
			var currentZ = self.getZoom();
			var newImageCtrX = Z.imageX;
			var newImageCtrY = Z.imageY;
			
			var vpBoundsInImagePixels = new BoundingBoxInPixels(newImageCtrX, newImageCtrY, -(viewW / 2), (viewW / 2), -(viewH / 2), (viewH / 2), currentZ);
			var viewL = vpBoundsInImagePixels.left;
			var viewR = vpBoundsInImagePixels.right;
			var viewT = vpBoundsInImagePixels.top;
			var viewB = vpBoundsInImagePixels.bottom;
			if (Z.imageW * currentZ > viewW) {
				if (viewL < 0) {
					newL += viewL * currentZ;   // Zoomed in, limit pan right.
				} else if (viewR > Z.imageW) {
					newL -= (Z.imageW - viewR) * currentZ;   // Zoomed in, limit pan left.
				}
			} else {
				newL += (newImageCtrX - Z.imageW / 2) * currentZ;  // Zoomed out, center image.
			}
			if (Z.imageH * currentZ > viewH) {
				if (viewT < 0) {
					newT += viewT * currentZ;   // Zoomed in, limit pan down.
				} else if (viewB > Z.imageH) {
					newT -= (Z.imageH - viewB) * currentZ;   // Zoomed in, limit pan up.
				}
			} else {
				newT += (newImageCtrY - Z.imageH / 2) * currentZ;  // Zoomed out, center image.
			}
		}
		return new Z.Utils.Point(newL, newT);
	};

	function constrainPanByViewportContainerCoordinates (newL, newT) {
		// Modify new viewer displays container position to ensure image is in view. This
		// function is used during panning using the mouse, touch, key, or navigator, as well
		// as during zoom-and-pan and zoom-and-pan-to-view processes.
		if (Z.constrainPan) {
			// Calculate current zoom as scaling progresses. 
			var currentZ = self.getZoom();
			
			var newImageCtrX = Z.imageX - ((newL - displayL) / currentZ);
			var newImageCtrY = Z.imageY - ((newT - displayT) / currentZ);
			var vpBoundsInImagePixels = new BoundingBoxInPixels(newImageCtrX, newImageCtrY, -(viewW / 2), (viewW / 2), -(viewH / 2), (viewH / 2), currentZ);
			var viewL = vpBoundsInImagePixels.left;
			var viewR = vpBoundsInImagePixels.right;
			var viewT = vpBoundsInImagePixels.top;
			var viewB = vpBoundsInImagePixels.bottom;
			if (Z.imageW * currentZ > viewW) {
				if (viewL < 0) {
					newL += viewL * currentZ;   // Zoomed in, limit pan right.
				} else if (viewR > Z.imageW) {
					newL -= (Z.imageW - viewR) * currentZ;   // Zoomed in, limit pan left.
				}
			} else {
				newL += (newImageCtrX - Z.imageW / 2) * currentZ;  // Zoomed out, center image.
			}
			if (Z.imageH * currentZ > viewH) {
				if (viewT < 0) {
					newT += viewT * currentZ;   // Zoomed in, limit pan down.
				} else if (viewB > Z.imageH) {
					newT -= (Z.imageH - viewB) * currentZ;   // Zoomed in, limit pan up.
				}
			} else {
				newT += (newImageCtrY - Z.imageH / 2) * currentZ;  // Zoomed out, center image.
			}
		}
		return new Z.Utils.Point(newL, newT);
	};

	function constrainZoom (z) {
		// Ensure image is not zoomed beyond specified min and max values.
		if (z > Z.maxZ) {
			z = Z.maxZ;
		} else if (z < Z.minZ) {
			z = Z.minZ;
		}
		return z;
	};

	function syncToolbarSlider () {
		// Set toolbar slider button position.
		if (Z.ToolbarDisplay && Z.Toolbar.getInitialized()) {
			var currentZ = self.getZoom();
			Z.Toolbar.syncSliderToViewport(currentZ);
		}
	};

	function syncNavigator () {
		// Set navigator rectangle size and position.
		if (Z.Navigator && Z.Navigator.getInitialized()) {
			Z.Navigator.syncToViewport();
		}
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::: WATERMARK FUNCTIONS :::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	
	function loadWatermark() {
		watermarkImage = new Image();
		watermarkAlpha = parseFloat(Z.Utils.getResource("DEFAULT_WATERMARKALPHA"));
		watermarkImage.url = Z.watermarkPath;
		watermarkImage.onload = displayWatermarks;
		watermarkImage.onerror = watermarkLoadingFailed;
		watermarkImage.src = Z.watermarkPath;
	};

	function displayWatermarks () {
		if (wD) {
			var markMinScale = parseFloat(Z.Utils.getResource("DEFAULT_WATERMARKMINSCALE"));
			var markSpanW = parseFloat(Z.Utils.getResource("DEFAULT_WATERMARKSPANW"));
			var markSpanH = parseFloat(Z.Utils.getResource("DEFAULT_WATERMARKSPANH"));
			var currentZ = self.getZoom();
			var displayOffsetL = ((Z.imageW * currentZ) - wD.width) / 2;
			var displayOffsetT = ((Z.imageH * currentZ) - wD.height) / 2;
			var imageOffsetL = ((Z.imageW / 2) - Z.imageX) * currentZ;
			var imageOffsetT = ((Z.imageH / 2) - Z.imageY) * currentZ;

			var markScale = (currentZ < markMinScale) ? markMinScale : currentZ;
			var marksAcross = Math.round(Z.imageW / markSpanW);
			var marksDown = Math.round(Z.imageH / markSpanH);
			var bounds = getViewportDisplayBoundingBoxInPixels();
			var wiScaledW = watermarkImage.width * markScale;
			var wiScaledH = watermarkImage.height * markScale;
			var wicLPrior = 0, wicTPrior = 0;

			// Create rows and columns of watermarks, without overlap, within current view.
			for (var i = 1; i <= marksAcross; i++) {
				for (var j = 1; j <= marksDown; j++) {
					var x = Math.round(Z.imageW / (marksAcross + 1) * i);
					var y = Math.round(Z.imageH / (marksDown + 1) * j);
					if (x > bounds.left && x < bounds.right && y > bounds.top && y < bounds.bottom) {
						var wicL = Math.round((x * currentZ) - (wiScaledW / 2) - displayOffsetL + imageOffsetL);
						var wicT = Math.round((y * currentZ) - (wiScaledH / 2) - displayOffsetT + imageOffsetT);

						// Skip row/column if too close to row/column at left or above.
						if (Z.imageW > 4000) {
							var wicLTarget = wicLPrior + 100;
							var wicTTarget = wicTPrior + 100;
							if (wicL < wicLTarget && wicT < wicTTarget) { continue; }
							wicLPrior = wicL;
							wicTPrior = wicT;
						}
						
						displayWatermark(wiScaledW, wiScaledH, wicL, wicT);
					}
				}
			}
		}
	};
	
	function displayWatermark (wiScaledW, wiScaledH, wicL, wicT) {
		// DEV NOTE: If implementing drawWatermarkOnCanvas alternative, branch here.
		drawWatermarkInHTML(wiScaledW, wiScaledH, wicL, wicT);
	};

	function drawWatermarkInHTML (wiScaledW, wiScaledH, wicL, wicT) { 
		// Draw watermark graphic on screen in HTML not on canvas, to support clearing
		// and displaying as necessary for rapid and smooth zoom and pan. Clone graphic
		// file to fill all instances of watermark rather than only last instance.
		var wImage = watermarkImage.cloneNode(false);
		Z.Utils.setOpacity(wImage, watermarkAlpha);
		wImage.width = wiScaledW;
		wImage.height = wiScaledH;
		var wiContainer = Z.Utils.createContainerElement("div", "wiC", "inline-block", "absolute", "hidden", wiScaledW + "px", wiScaledH + "px", wicL + "px", wicT + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
		wiContainer.appendChild(wImage);
		wD.appendChild(wiContainer);
		Z.Utils.addEventListener(wImage, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.addEventListener(wImage, "mousedown", Z.Utils.preventDefault);
	};

	function redisplayWatermarks () {
		if (wD) {
			// First clear watermarks previously drawn.
			clearDisplay(wD);

			// Redraw watermarks at new scale.
			displayWatermarks();
		}
	};

	function watermarkLoadingFailed () {
		Z.Utils.showMessage(Z.Utils.getResource("ERROR_WATERMARKPATHINVALID") + this.url);
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::: HOTSPOT & ANNOTATION FUNCTIONS :::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
		
	function loadHotspotsOrAnnotationsXML() {
		// Load hotspot or annotation XML to get graphic, placement, and other properties.
		var XMLPath;
		
		if (Z.Utils.isStrVal(Z.hotspotPath)) {
			if (Z.hotspotPath.toLowerCase().substring(Z.hotspotPath.length - 4, Z.hotspotPath.length) == ".xml") {
				XMLPath = Z.Utils.cacheProofPath(Z.hotspotPath);
			} else {
				Z.hotspotPath = Z.hotspotPath + "/" + Z.Utils.getResource("DEFAULT_HOTSPOTSXMLFILE");
				XMLPath = Z.Utils.cacheProofPath(Z.hotspotPath);
			}
		} else if (Z.Utils.isStrVal(Z.annotationPath)) {
			if (Z.annotationPath.toLowerCase().substring(Z.annotationPath.length - 4, Z.annotationPath.length) == ".xml") {
				XMLPath = Z.Utils.cacheProofPath(Z.annotationPath);
			} else {
				Z.annotationPath = Z.annotationPath + "/" + Z.Utils.getResource("DEFAULT_ANNOTATIONSXMLFILE");
				XMLPath = Z.Utils.cacheProofPath(Z.annotationPath);
			}
		}
		
		var netConnector = new Z.NetConnector();
		netConnector.loadXML(XMLPath);
	};		
	
	this.parseHotspotsXML = function (xmlDoc) {
		// Parse display setup information.		
		var hotspotSetup = xmlDoc.getElementsByTagName("HOTSPOTSETUP")[0];
		var listPosition = hotspotSetup.getAttribute("CHOICELIST");
		hotspotListPosition = (Z.Utils.isStrVal(listPosition)) ? listPosition : Z.Utils.getResource("DEFAULT_HOTSPOTLISTPOSITION");
		var listSource = hotspotSetup.getAttribute("LISTSOURCE");
		var hotspotListSource = (Z.Utils.isStrVal(listSource)) ? listSource : Z.Utils.getResource("DEFAULT_HOTSPOTLISTSOURCE");
		var listTitle = hotspotSetup.getAttribute("LISTTITLE");
		var hotspotListTitle = (Z.hotspotListTitle !== null) ? Z.hotspotListTitle : (Z.Utils.isStrVal(listTitle)) ? listTitle : Z.Utils.getResource("DEFAULT_HOTSPOTLISTTITLE");
		var initialVisibilityDefault = Z.Utils.getResource("DEFAULT_HOTSPOTSINITIALVISIBILITY");
		var initialVisibility = hotspotSetup.getAttribute("INITIALVISIBILITY");
		if (initialVisibilityDefault) { 
			hotspotsInitialVisibility = (initialVisibility != "0" && initialVisibility != "hide"); // Default true.
		} else {
			hotspotsInitialVisibility = (initialVisibility != "1" && initialVisibility != "show"); // Default false.
		}
		var minScaleAttrib = parseFloat(hotspotSetup.getAttribute("MINSCALE"));
		var maxScaleAttrib = parseFloat(hotspotSetup.getAttribute("MAXSCALE"));	
		hotspotsMinScale = (!isNaN(minScaleAttrib)) ? minScaleAttrib : 1;		
		hotspotsMaxScale = (!isNaN(maxScaleAttrib)) ? maxScaleAttrib : 1;		
		var hotspotsMedia = [];
		hotspotListDP = []; hotspotMediaElements = [];
		var mTypeLegacy = false;
		
		// Create hotspot internalID counter for unique values - maintain consistency with labels of annotation feature.
		var labelCounter = -1;

		// Parse hotspots.
		var hotspotNodes = xmlDoc.getElementsByTagName("HOTSPOT");
		for (var i = 0, j = hotspotNodes.length; i < j; i++) {
			var hotspot = new Hotspot(hotspotNodes[i]);
			
			labelCounter++;
			hotspot.internalID = labelCounter;
			
			if (hotspotIsValid(hotspot)) {
				hotspots.push(hotspot);
				
				// Record media required for all hotspots.  Duplicates removed below. Set flag if any library
				// clip media from Flash viewers are referenced.  Display an error once, after parsing completion.
				// Allow media type of 'symbol' if media is polygon (for potential transfer of support from annotations).  				
				if (hotspotNodes[i].getAttribute("MEDIATYPE") != "symbol") {
					var tempMedia = hotspotNodes[i].getAttribute("MEDIA");
					if (Z.Utils.isStrVal(tempMedia)) { hotspotsMedia.push(tempMedia); }
				} else if (hotspotNodes[i].getAttribute("MEDIA") != "polygon") {
					mTypeLegacy = true;
				}
				
				// Fill hotspot lists. Note that unique internal ID is not created for each hotspot
				// as with annotation labels because annotation labels span POIs (points of interest) 
				// and could be non-unique. Hotspot IDs should be unique and are more likely to be'
				// used by external developers for hotspot identification in custom projects.
				var idAttEsc = unescape(hotspotNodes[i].getAttribute("ID"));
				var nameAttEsc = unescape(hotspotNodes[i].getAttribute("NAME"));
				var captionAttEsc = unescape(hotspotNodes[i].getAttribute("CAPTION"));
				var tooltipAttEsc = unescape(hotspotNodes[i].getAttribute("TOOLTIP"));					
				switch (hotspotListSource) {
					case "CAPTION" : 
						hotspotListDP.push( { text:captionAttEsc, value:idAttEsc } );
						break;
					case "TOOLTIP" :
						hotspotListDP.push( { text:tooltipAttEsc, value:idAttEsc } );					
						break;
					default :
						hotspotListDP.push( { text:nameAttEsc, value:idAttEsc } );					
				}				
			}
		}
		
		// Trace one error for Flash library media, if referenced.
		if (Z.debug == 2 && mTypeLegacy) { Z.Utils.trace(Z.Utils.getResource("ERROR_HOTSPOTMEDIAINVALID")); }
		
		// Set initial visibility state of hotspots display. Now parsing XML so this is initial state, not redisplay or toggle. 
		hS.visibility = (hotspotsInitialVisibility) ? "visible" : "hidden";
		
		// Create hotpot choice list.
		createHotspotChoiceList(hotspotListTitle, hotspotListDP);
		
		// Display hotspots that have no hotspot graphics.
		// Next line required as default selection on hotspot list is title value so no initial
		// view adjustment is needed and handler therefore does not call update view so
		// call to display hotspots will occur before hotspots list is filled and calls as each
		// hotspot media loads will only load hotspots with media.
		displayHotspotsWithoutMedia();
		
		// Load image file(s) for hotspot graphics. On each load, relevant hotspot(s) will be created.
		hotspotsMedia.sort();
		hotspotsMedia = Z.Utils.removeDups(hotspotsMedia);
		loadHotspotsMedia(hotspotsMedia);
	};

	function Hotspot (hotspotNode) { 
		this.id = hotspotNode.getAttribute("ID");
		this.internalID = parseInt(hotspotNode.getAttribute("INTERNALID"));
		this.name = hotspotNode.getAttribute("NAME");
		this.mediaType = hotspotNode.getAttribute("MEDIATYPE"); // 'url' supported by HTML5, 'symbol' additionally supported by Flash.
		this.media = hotspotNode.getAttribute("MEDIA"); // This is a path.
		this.image = null; // Media content, added on load.
		this.iW = null; // Media width stored to avoid width of 0 when cloning.
		this.iH = null; // Media height stored to avoid height of 0 when cloning.
		var xParam = parseFloat(hotspotNode.getAttribute("X"));
		this.x = isNaN(xParam) ? 0 : xParam;
		var yParam = parseFloat(hotspotNode.getAttribute("Y"));
		this.y = isNaN(yParam) ? 0 : yParam;
		var zParam = parseFloat(hotspotNode.getAttribute("ZOOM"));
		this.zoom = isNaN(zParam) ? -1 : zParam;
		var xScaleParam = parseFloat(hotspotNode.getAttribute("XSCALE"));
		this.xScale = isNaN(xScaleParam) ? 100 : xScaleParam;
		var yScaleParam = parseFloat(hotspotNode.getAttribute("YSCALE"));
		this.yScale = isNaN(yScaleParam) ? 100 : yScaleParam;
		this.url = hotspotNode.getAttribute("URL");
		this.urlTarget = hotspotNode.getAttribute("URLTARGET");
		var rollParam = hotspotNode.getAttribute("ROLLOVER");
		this.rollover = ((rollParam == "1") || (rollParam == "true"));
		this.caption = hotspotNode.getAttribute("CAPTION");
		this.tooltip = hotspotNode.getAttribute("TOOLTIP");
		this.textColor = "#" + hotspotNode.getAttribute("TEXTCOLOR");
		this.backColor = "#" + hotspotNode.getAttribute("BACKCOLOR");
		this.lineColor = "#" + hotspotNode.getAttribute("LINECOLOR");
		this.fillColor = "#" + hotspotNode.getAttribute("FILLCOLOR");
		this.textVisible = (hotspotNode.getAttribute("TEXTVISIBLE") != "0");
		this.backVisible = (hotspotNode.getAttribute("BACKVISIBLE") != "0");
		this.lineVisible = (hotspotNode.getAttribute("LINEVISIBLE") != "0");
		this.fillVisible = (hotspotNode.getAttribute("FILLVISIBLE") != "0");
		var capPos = hotspotNode.getAttribute("CAPTIONPOSITION");
		this.captionPosition = Z.Utils.isStrVal(capPos) ? capPos : "8";
		this.saved = true;
					
		// Create value to be reset by setHotspotVisibility function, not rollover handlers, for reference in drawHotspotInHTML function during redisplay during zoom. 
		this.visibility = true;
		
		// DEV NOTE: Hotspots of media type 'url' include media value that provides path to 
		// external graphic file. Hotspots of type 'symbol' refer to graphic stored in internal library
		// of Flash Viewer.  In HTML5 Viewer all hotspots are of type 'url', not type 'symbol', 
		// due to lack of internal library. Exception: polygonal hotspots which are drawn by code.
		this.polygonPts = null;
		if (hotspotNode.getAttribute("MEDIA")  == "polygon") {
			var poly = hotspotNode.getElementsByTagName("POLYGON");
			var polyPoints = poly[0].getElementsByTagName("POINT"); 
			var polyPts = [];
			for (var i = 0, j = polyPoints.length; i < j; i++) {
				polyPts.push( { x:polyPoints[i].getAttribute("X"), y:polyPoints[i].getAttribute("Y") } );
			}
			this.polygonPts = polyPts;
		}
		
		// DEV NOTE: This value stored for error handling and possible future use.	
		var MEDIATYPE_SYMBOL = 1, MEDIATYPE_URL = 2;
		var mType = hotspotNode.getAttribute("MEDIATYPE");
		this.mediaType = (mType == "symbol") ? MEDIATYPE_SYMBOL : MEDIATYPE_URL;
	};
	
	function loadHotspotsMedia (mediaArray) {
		var loadStart = new Date().getTime();
		for (var i = 0, j = mediaArray.length; i < j; i++) {
			loadHotspotMedia(mediaArray[i], loadStart);
		}
	};
	
	function loadHotspotMedia (src, loadTime) {
		// Asynchronously load tile and ensure handler function is called upon loading.
		// Pass src string rather than tile object (as in loadTile use) as third parameter of 
		// createCallback function, to allow identification of corresponding hotspot on load.
		var hotspotLoading = hotspotNetConnector.loadImage(src, Z.Utils.createCallback(null, onHotspotMediaLoad, src, loadTime), "hotspot");
	};
	
	function onHotspotMediaLoad (src, loadTime, media) {
		if (src && loadTime && media) {
			// Calculate zoom, scale, and position values outside all loops.
			var hC = new HotspotContext();

			for (var i = 0, j = hotspots.length; i < j; i++) {
				if (hotspots[i].media == src) {
					// Clone media into hotspot array here. Waiting to clone when drawing
					// into display reduces memory use but slows redisplay during zoom.
					hotspotMediaElements.push(media.cloneNode(false));
					hotspots[i].image = media.cloneNode(false);
					hotspots[i].iW = media.width;
					hotspots[i].iH = media.height;
					var x = hotspots[i].x;
					var y = hotspots[i].y;					
					if (x > hC.bounds.left && x < hC.bounds.right && y > hC.bounds.top && y < hC.bounds.bottom) {
						displayHotspot(hotspots[i], hC);
					}
				}
			}		
		} else {
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_HOTSPOTPATHINVALID"));
		}
	};
	
	function redisplayHotspots() {
		if (hD) {
			// First clear hotspots previously drawn.
			clearDisplay(hD);
			if (dD) { clearDisplay(dD); }
			if (eD) { clearDisplay(eD); }
			
			// Redraw hotspots at new scale.
			displayHotspots();
		}
	};
	
	function displayHotspotsWithoutMedia () {
		// Calculate zoom, scale, and position values outside all loops.
		var hC = new HotspotContext();
		for (var i = 0, j = hotspots.length; i < j; i++) {
			if (hotspots[i].media == "" || hotspots[i].media == "polygon") {
				var x = hotspots[i].x;
				var y = hotspots[i].y;		
				if (x > hC.bounds.left && x < hC.bounds.right && y > hC.bounds.top && y < hC.bounds.bottom) {
					displayHotspot(hotspots[i], hC);
				}
			}
		}	
	};
	
	function displayHotspots () {
		// Calculate zoom, scale, and position values outside all loops.
		var hC = new HotspotContext();
		for (var i = 0, j = hotspots.length; i < j; i++) {
			var x = hotspots[i].x;
			var y = hotspots[i].y;		
			if ((x + polygonViewIncrement) > hC.bounds.left && (x - polygonViewIncrement) < hC.bounds.right && (y + polygonViewIncrement) > hC.bounds.top && (y - polygonViewIncrement) < hC.bounds.bottom) {
				displayHotspot(hotspots[i], hC);
			}
		}	
		
		// DEV NOTE: Workaround for zero contents mousemove problem in some browsers.
		// Ensure at least one item in hotspotsDisplay container or second click-drags will fail.
		if (hD.childNodes.length == 0) {
			var hotspotImmortal = Z.Utils.createContainerElement("div", "hotspotImmortal", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
			hD.appendChild(hotspotImmortal);
		}
	};
	
	function displayHotspot (hotspot, hC) {
		// Polygonal hotspot graphics are drawn on canvas for diagonal line support.
		// Draw prior to related hotspot to place under caption and/or graphics.
		if (hotspot.media == "polygon") { drawPolygonOnCanvas(hotspot, hC); }

		// All other hotspot elements are drawn in HTML for simplicity: media, caption, etc.
		drawHotspotInHTML(hotspot, hC);
	};
	
	function drawHotspotInHTML (hotspot, hC) {
		// First, verify hotspot media is specified and has loaded. Drawing is called on load of media, 
		// during view updating, and when setting up annotation panel choice lists - the latter can 
		// happen before all media have loaded. Final clause allows for difference between 
		// loading process for hotspots.xml and annotation.xml.
		if ((!Z.Utils.isStrVal(hotspot.media) && !Z.Utils.isStrVal(hotspot.caption)) || ((hotspot.iW == null || hotspot.iH == null) && hotspot.media != "polygon") && (dD || !Z.Utils.isStrVal(hotspot.caption)) ) { 
			return; 
		}
		
		// Remove prior instance of hotspot, if any.
		var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspot.internalID);
		if (hotspotCurrentIndex != -1) { clearHotspotInHTML(hotspots[hotspotCurrentIndex]); }

		// Calculate hotspot size.
		if (Z.useCanvas && hotspot.media == "polygon") {
			var polyPts = hotspot.polygonPts;
			var polyDimensions = Z.Utils.getDimensionsFromPolygonPoints(hotspot.polygonPts);
			hotspot.iW = polyDimensions.x;
			hotspot.iH = polyDimensions.y;
		} 
		
		// Avoid mispositioned captions by not drawing if width or height of media is null unless 
		// media is not polygon and also not "" (hotspot with caption but without media).  This 
		// also prevents error in following lines due to null values leading to negative w or h below.
		if ((hotspot.iW === null || hotspot.iH == null) && (hotspot.media != "polygon" && hotspot.media != "")) {
			return;
		}
		
		var hiScaledW = hotspot.iW * hC.constrainedScale * ((hotspot.xScale / 100) / (hotspot.zoom / 100));
		var hiScaledH = hotspot.iH * hC.constrainedScale * ((hotspot.yScale / 100) / (hotspot.zoom / 100));
				
		// Draw hotspot graphic on screen in HTML not on canvas, to support clearing
		// and displaying as necessary for rapid and smooth zoom and pan, as well as 
		// to support click and rollover events and other interactive features.
		var hImage;
		if (hotspot.image) {
			hImage = hotspot.image;
			hImage.align = "top";
			hImage.width = hiScaledW;
			hImage.height = hiScaledH;
		}		
		
		// Calculate hotspot position.
		var hicL = Math.round((hotspot.x * hC.currentZ) - (hiScaledW / 2) - hC.displayOffsetL + hC.imageOffsetL);
		var hicT = Math.round((hotspot.y * hC.currentZ) - (hiScaledH / 2) - hC.displayOffsetT + hC.imageOffsetT);

		// Create hotspot caption.
		var hCaption;
		if (Z.Utils.isStrVal(hotspot.caption)) {
			hCaption = createHotspotCaption(hotspot, hC);
		}
		
		// Create hotspot contents visibility cloak.
		var hCloak = Z.Utils.createContainerElement("div", "hCloak", "inline-block", "absolute", "visible");

		// Create hotspot element in display.
		var elementID = "hot" + hotspot.internalID.toString();
		var hContainer = Z.Utils.createContainerElement("div", elementID, "inline-block", "absolute", "visible", hiScaledW + "px", hiScaledH + "px", hicL + "px", hicT + "px", "none", "0px", "transparent none", "0px", "0px", "normal");

		// Set hotspot tooltip.
		if (Z.Utils.isStrVal(hotspot.tooltip)) { hContainer.title = unescape(hotspot.tooltip); }
		
		// Implement click effect url using anchor href on image and/or caption, rather than 
		// using window.open in mousedown handler.  This ensures user interaction and avoids 
		// triggering popup blockers if a new window is targeted.
		if (Z.Utils.isStrVal(hotspot.url)) {
			if (hImage) {
				var hiAnchor = document.createElement("a");
				hiAnchor.setAttribute("href", hotspot.url);
				hiAnchor.setAttribute("target", hotspot.urlTarget);
				hiAnchor.setAttribute("outline", "none");
				hiAnchor.appendChild(hImage);
				hImage.style.cursor = "help";
				hImage.style.border = "none";
			}
			if (hCaption) {
				var hcAnchor = document.createElement("a");
				hcAnchor.setAttribute("href", hotspot.url);
				hcAnchor.setAttribute("target", hotspot.urlTarget);
				hcAnchor.setAttribute("outline", "none");
				hcAnchor.appendChild(hCaption);
				hCaption.style.cursor = "help";
				
				// DEV NOTE: Border sometimes appears regardless of setting in Firefox so leave visible.
				//hCaption.style.border = "none";
			}			
			hCloak.style.border = "none";
		}

		// Add anchor or image and anchor or caption to cloak.
		if (Z.Utils.isStrVal(hotspot.url)) {
			if (hiAnchor) { hCloak.appendChild(hiAnchor); }
			if (hcAnchor) { hCloak.appendChild(hcAnchor); }
		} else {
			if (hImage) { hCloak.appendChild(hImage); }
			if (hCaption) { hCloak.appendChild(hCaption); }
		}
			
		// Add cloak to container, and container to display. 
		hContainer.appendChild(hCloak);
		hD.appendChild(hContainer);
		
		// Set hotspot visibility.
		if (hotspot.rollover) { hCloak.rollover = hotspot.rollover; }
		setHotspotVisibility(hContainer, (!hotspot.rollover && hotspot.visibility));
		
		// Position hotspot caption. Must occur after added to display because text container width setting is 'auto'.
		if (hCaption) {
			var capPosPt = calculateHotspotCaptionPosition(hCaption, hotspot.captionPosition, hiScaledW, hiScaledH);
			hCaption.style.left = capPosPt.x + "px";
			hCaption.style.top = capPosPt.y + "px";
		}
		
		// Handle mouseover and click events.
		if (hotspot.rollover) {
			Z.Utils.addEventListener(hContainer, "mouseover", hotspotMouseOverHandler);
			Z.Utils.addEventListener(hContainer, "mouseout", hotspotMouseOutHandler);
		}
		
		// DEV NOTE: Event handlers below provide custom functionality as alternative to use of hiAnchor above.
		// If implementing handlers, also modify comment out lines above in section "Implement click effect url as href..." 
		// If passing a function name using url attribute in XML, modify lines above in section "Add anchor or image to cloak." 
		/* if (Z.Utils.isStrVal(hotspot.url)) {
			Z.Utils.addEventListener(hContainer, "mousedown", hotspotMouseDownHandler);
			Z.Utils.addEventListener(hContainer, "mouseup", hotspotMouseUpHandler);
			Z.Utils.addEventListener(hContainer, "touchstart", hotspotTouchStartHandler);
			Z.Utils.addEventListener(hContainer, "touchend", hotspotTouchEndHandler);
			Z.Utils.addEventListener(hContainer, "touchcancel", hotspotTouchCancelHandler);
		} */
		
		//  Prevent graphic dragging and disable context menu.
		Z.Utils.addEventListener(hContainer, "mousedown", Z.Utils.preventDefault);
		Z.Utils.addEventListener(hContainer, "contextmenu", Z.Utils.preventDefault);
	};
	
	function clearHotspotInHTML (hotspot) {		
		var hotspotTarget = document.getElementById("hot" + hotspot.internalID);
		if (hotspotTarget !== null) {
			hotspotTarget.parentNode.removeChild(hotspotTarget);
		}
	};

	function getFreeID (idTarget) {
		var id = 0;
		var idList = []		
		switch(idTarget) {
			case "poi":
				for (var i = 0, j = poiListDP.length; i < j; i++) { idList.push(poiListDP[i].value); }
				break;
			case "note":
				for (var i = 0, j = notesListDP.length; i < j; i++) { idList.push(notesListDP[i].value); }
				break;
			case "label":	
				for (var i = 0, j = labelListDP.length; i < j; i++) { idList.push(labelListDP[i].value); }
				break;
			case "labelExternal":
				for (var i = 0, j = hotspots.length; i < j; i++) { idList.push(hotspots[i].id); }
				break;
			case "hotspot":
				for (var i = 0, j = hotspots.length; i < j; i++) { idList.push(hotspots[i].internalID); }
				break;
		}
		idList.sort();
		for (var i = 0, j = idList.length; i < j; i++) {
			if (idList[i] != id) { 
				i = j;
			} else {
				id++;
			}
		}
		return id;
	};
	
	function HotspotContext () {
		this.bounds = getViewportDisplayBoundingBoxInPixels();
		this.currentZ = self.getZoom();
		this.constrainedScale = (this.currentZ < hotspotsMinScale) ? hotspotsMinScale : ((this.currentZ > hotspotsMaxScale) ? hotspotsMaxScale : this.currentZ);
		this.displayOffsetL = ((Z.imageW * this.currentZ) - hD.width) / 2;
		this.displayOffsetT = ((Z.imageH * this.currentZ) - hD.height) / 2;
		this.imageOffsetL = ((Z.imageW / 2) - Z.imageX) * this.currentZ;
		this.imageOffsetT = ((Z.imageH / 2) - Z.imageY) * this.currentZ;	
	};
	
	function createHotspotCaption (hotspot, hC) {		
		// Calculate current size values.
		var scale = hC.constrainedScale * ((hotspot.xScale / 100) / (hotspot.zoom / 100));
		var scaledFontSize = Math.round(defaultFontSize * scale);
		var constrainedFontSize = ((scaledFontSize < minFontSize) ? minFontSize : (( scaledFontSize > maxFontSize) ? maxFontSize : scaledFontSize));

		// Create caption text node and container.
		var padding = defaultPadding * scale;
		var constrainedPadding = ((padding < minPadding) ? minPadding : (( padding > maxPadding) ? maxPadding : padding));
		var captionTextBox = Z.Utils.createContainerElement("div", "captionTextBox", "inline-block", "absolute", "hidden", "auto", "auto", "1px", "1px", "solid", "1px", "white", "0px", constrainedPadding + "px", "nowrap");
		var captionTextNode = document.createTextNode(unescape(hotspot.caption));
		captionTextBox.appendChild(captionTextNode);

		// Assign size values.
		Z.Utils.setTextStyle(captionTextNode, "black", "verdana", constrainedFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");
				
		// Prevent text selection and context menu.
		Z.Utils.addEventListener(captionTextBox, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.disableTextInteraction(captionTextNode);
		
		return captionTextBox;
	};
	
	function calculateHotspotCaptionPosition (hCaption, position, hW, hH) {
		// Calculate caption width.
		var padding = parseFloat(hCaption.style.padding);
		var computedW = parseFloat(Z.Utils.getElementStyleProperty(hCaption, "width"));
		if (isNaN(computedW)) {
			// Workaround for IE failure to report text container element width if setting is 'auto'.
			var font2Pixels = parseFloat(Z.Utils.getResource("DEFAULT_FONTTOPIXELSCONVERSIONFACTOR"));
			var ratioPixs2Chars = parseFloat(hCaption.style.fontSize) / font2Pixels;
			computedW = Math.round(parseFloat(hCaption.firstChild.length * ratioPixs2Chars));
		}
		var currentZ = self.getZoom();
		var computedH = 20 * currentZ;
		var x, y;
		switch(position) {
			case "1":	// top left
				x = - computedW - padding;
				y = - computedH - padding;
				break;
			case "2":	// top center
				x = ((hW - computedW) / 2) - padding;
				y = - computedH - padding;
				break;
			case "3":	// top right
				x = hW + padding;
				y = - computedH - padding;
				break;
			case "4":	// center left
				x = - computedW - padding;
				y = (hH - computedH) / 2;
				break;
			case "5":	// center center
				x = ((hW - computedW) / 2) - padding;
				y = (hH - computedH) / 2;
				break;
			case "6":	// center right
				x = hW + padding;
				y = (hH - computedH) / 2;
				break;
			case "7":	// bottom left
				x = - computedW - padding;
				y = hH + padding;
				break;
			case "8":	// bottom center
				x = ((hW - computedW) / 2) - padding;
				y = hH + padding;
				break;
			case "9":	// bottom right
				x = hW + padding;
				y = hH + padding;
				break;						
		}
		return new Z.Utils.Point(x, y);
	};
	
	
	function createHotspotChoiceList (listTitle, dataProvider) {
		var listW = parseInt(Z.Utils.getResource("DEFAULT_HOTSPOTLISTWIDTH"), 10);
		var listCoords = getHotspotListCoords(hotspotListPosition, listW, viewW, viewH); // viewH allows for toolbar height if static in viewer display area.
		var visible = (hotspotListPosition == "0") ? "hidden" : "visible";
		
		// Clear preexisting choice list, if any.
		var oldHotspotList = document.getElementById("hotspotList");
		if (oldHotspotList) { Z.ViewerDisplay.removeChild(oldHotspotList); }
		
		// Create choice list and add to viewer.
		hotspotList = new Z.Utils.createSelectElement("hotspotList", listTitle, dataProvider, listW, listCoords.x, listCoords.y, visible, hotspotListChangeHandler);
		hotD = hotspotList;
		hotS = hotD.style;
		Z.ViewerDisplay.appendChild(hotspotList);
		
		// Next line not required as default selection on hotspot list is title value so no initial
		// view adjustment is needed. Also, handler therefore does not call update view so
		// call to displayHotspotsWithoutMedia is needed on initial load.
		//hotspotListChangeHandler();
	};
	
	this.createHotspot = function (id, name, mediaType, media, x, y, zoom, xScale, yScale, url, urlTarget, rollover, caption, tooltip) {
		var xmlText = "<HOTSPOT ID='" + id  + "' NAME='" + name + "' MEDIATYPE='" + mediaType + "' MEDIA='" + media + "' X='" + x.toString() + "' Y='" + y.toString() + "' ZOOM='" + zoom.toString() + "' XSCALE='" + xScale.toString() +"' YSCALE='" + yScale.toString() + "' URL='" + url + "' URLTARGET='" + urlTarget + "' ROLLOVER='" + rollover + "' CAPTION='" + caption + "' TOOLTIP='" + tooltip + "'></HOTSPOT>"
		var xmlDoc = Z.Utils.convertXMLTextToXMLDoc(xmlText);
		var hotspotNodes = xmlDoc.getElementsByTagName("HOTSPOT");
		var hotspot = new Hotspot(hotspotNodes[0]);
		
		// Assign unique hotspot internalID value for code access - maintain consistency with labels of annotation feature.
		hotspot.internalID = getFreeID("hotspot");
		
		var index = hotspotMediaElements.indexOfObjectValueSubstring("src", hotspot.media);
		var media = hotspotMediaElements[index];
				
		if (index != -1) {
			// Workaround for image sizing issues.
			var tempImg = new Image();
			tempImg.src = hotspot.media;
			var w = tempImg.width;
			var h = tempImg.height;
			tempImg = null;
			
			// Add image content to hotspot and add hotspot to display.
			hotspot.image = media.cloneNode(false);
			hotspot.iW = w;
			hotspot.iH = h;
			var hC = new HotspotContext();			
			displayHotspot(hotspot, hC);
		} else {			
			// Load new hotspot image content. Display will occur on load.
			var loadStart = new Date().getTime();
			loadHotspotMedia(hotspot.media, loadStart);
		}
		
		// Add hotspot to hotspots array for redraws on zoom and pan and to hotspots choicelist.
		hotspots.push(hotspot);
		addHotspotToChoiceList(hotspot.name, hotspot.internalID);
		
		// Debug option: Example use of createHotspot function (apply in button click handler or other function).
		// self.createHotspot("200", "Test", "url", "Assets/Hotspots/hotspotFromJPG.jpg", "250", "250", "100", "100","100", "http://www.zoomify.com", "_self", "false", "Test Caption", "This is a test tooltip.");
	};
	
	function addHotspotToChoiceList (text, value) {
		var hList = document.getElementById("hotspotList");
		if (hList != null) { hList.options[hList.options.length]=new Option(text, value); }
	};
	
	this.modifyHotspot = function () {
		// DEV NOTE: API addition in progress. 
	};
	
	this.setHotspotsVisibility = function (visibility) {
		// Set visibility of all hotspots (function name is plural).
		hS.visibility = (visibility) ? "visible" : "hidden";
	};
	
	this.setHotspotsVisibilityByFilter = function (filterBy, filterValue, visibility) {
		if (hotspots.length > 0) {
			if (hD && hD.childNodes.length > 0) {
				for (var i = 0, j = hotspots.length; i < j; i++) {
					if (hotspots[i][filterBy] == filterValue) {
						var hotspotTargetID = hotspots[i].id;
						var hotspotTarget = document.getElementById("hot" + hotspotTargetID);
						if (hotspotTarget != null) { setHotspotVisibility(hotspotTarget, visibility); }
					}
				}
			} else {
				var hotspotsVisibilityByFilterTimer = window.setTimeout( function() { setHotspotsVisibilityByFilter(filterBy, filterValue, visibility); }, 100);
			}
		}
	};	
	
	this.setHotspotVisibilityByID = function (id, visibility) {
		if (hotspots.length > 0) {
			if (hD && hD.childNodes.length > 0) {
				var index = hotspots.indexOfObjectValue("id", id);
				if (index != -1) {
					var hotspotTargetID = hotspots[index].id;
					var hotspotTarget = document.getElementById("hot" + hotspotTargetID);
					if (hotspotTarget != null) { setHotspotVisibility(hotspotTarget, visibility); }
				}
			} else {
				var hotspotsVisibilityByIDTimer = window.setTimeout( function() { setHotspotVisibilityByID(id, visibility); }, 100);
			}
		}
	};
	
	function setHotspotVisibility (hotspot, visibility) {
		// Hide hotspot by hiding internal contents using nested 'cloak' container.
		// On IE use opacity rather than visibility to ensure mouse events trigger.
		var cloak = hotspot.childNodes[0];
		if (cloak && cloak.style) {		
			cloak.style.visibility = "visible";
			
			var hVisibility = (visibility) ? "visible" : "hidden";
			var hBackColor = (visibility) ? "" : "#ffffff";
			var hOpacity = (visibility) ? 1 : 0.01;
			
			if (!(Z.browser == Z.browsers.IE)) {
				cloak.style.visibility = hVisibility;
			} else {
				cloak.style.backgroundColor = hBackColor;
				Z.Utils.setOpacity(cloak, hOpacity);
				var caption = hotspot.childNodes[0].childNodes[1];
				if (caption && caption.style) { caption.style.visibility = hVisibility; }
			}
			
			// Record state in hotspot (object array, not display) for reference in drawHotspotInHTML function during redisplay during zoom.
			var index = hotspots.indexOfObjectValue("internalID", hotspot.internalID);
			if (index != -1) { hotspots[index].visibility = visibility; }
		}
	};
	
	function getHotspotListCoords (position, listW, viewerW, viewerH) {
		//Hotspot list positioning: 0 hides, 1 top left, 2 top-right, 3 bottom right, 4 bottom left
		var listX, listY;
		var margin = 25;
		switch (position) {
			case "0": 
				listX = 0;
				listY = 0;
				break;
			case "1":
				listX = margin;
				listY = margin;
				break;
			case "2":
				listX = viewerW - listW - margin;
				listY = 20;
				break;
			case "3":
				listX = viewerW - listW - margin;
				if (toolbar != null) {
					listY = viewerH - margin;
				} else {
					listY = viewerH - margin;
				}
				break;
			case "4":
				listX = margin;
				if (toolbar != null) {
					listY = viewerH - margin;
				} else {
					listY = viewerH - margin;
				}
				break;			
			default:
				listX = viewerW - listW;
				listY = margin;	
		}
		return new Z.Utils.Point(listX, listY);
	};
	
	function hotspotIsValid(hotspot) {
		return (Z.Utils.isStrVal(hotspot.media) || Z.Utils.isStrVal(hotspot.caption));
	};
	
	function hotspotToString(hotspot) {
		var s = "[Hotspot ";
		s += "id:" + hotspot.id + ", ";
		s += "internalID:" + hotspot.internalID.toString() + ", ";
		s += "name:" + hotspot.name + ", ";
		s += "mediaType:" + hotspot.mediaType + ", ";
		s += "media:" + hotspot.media + ", ";
		s += "x:" + hotspot.x.toString() + ", ";
		s += "y:" + hotspot.y.toString() + ", ";
		s += "zoom:" + hotspot.zoom.toString() + ", ";
		s += "xScale:" + hotspot.xScale.toString() + ", ";
		s += "yScale:" + hotspot.yScale.toString() + ", ";
		s += "url:" + hotspot.url + ", ";
		s += "urlTarget:" + hotspot.urlTarget + ", ";
		s += "rollover:" + hotspot.rollover + ", ";
		s += "caption:" + hotspot.caption + ", ";
		s += "tooltip:" + hotspot.tooltip;
		s += "]";
		return s;
	};
		
	this.parseAnnotationsXML = function (xmlDoc) {
		// Verify XML structure is complete, and IDs are unique, regardless of version.
		annotationsXML = validateAnnotationsXML(xmlDoc);
		var temp;
		
		// Create label internalID counter for unique values across labels of all POIs.
		var labelCounter = -1;
		
		// Parse label setup information to set global variables.
		var labelSetup = annotationsXML.getElementsByTagName("LABELSETUP")[0];
		
		annotationPanelPosition = labelSetup.getAttribute("PANELPOSITION");
		hotspotsInitialVisibility = (labelSetup.getAttribute("INITIALVISIBILITY") != "0");		
		noteVisibility = (labelSetup.getAttribute("NOTEVISIBILITY") != "0");
		hotspotsMinScale = parseFloat(labelSetup.getAttribute("MINSCALE"));
		hotspotsMaxScale = parseFloat(labelSetup.getAttribute("MAXSCALE"));
		
		poiListDP = []; noteListDP = []; noteListCurrentDP = []; 
		labelListDP = []; labelListCurrentDP = []; hotspotMediaElements = [];
		var hotspotsMedia = [];
		var mTypeLegacy = false;
		
		// Fill POI, Note, and Label arrays. Traverse XML nodes already traversed in validateAnnotationsXML
		// function rather than populating arrays there, to allow removal of that function in contexts where data validation
		// is not needed. Add calculated internalID unique for labels across POIs.
		
		var poiNodes = annotationsXML.getElementsByTagName("POI"); 
		for (var i = 0, j = poiNodes.length; i < j; i++) {
		
			var poiIDAttEsc = unescape(poiNodes[i].getAttribute("ID"));
			var poiNameAttEsc = unescape(poiNodes[i].getAttribute("NAME"));
			var poiXAttEsc = unescape(poiNodes[i].getAttribute("X"));
			var poiYAttEsc = unescape(poiNodes[i].getAttribute("Y"));
			var poiZoomAttEsc = unescape(poiNodes[i].getAttribute("ZOOM"));
			poiListDP.push( { text:poiNameAttEsc, value:poiIDAttEsc, x:poiXAttEsc, y:poiYAttEsc, zoom:poiZoomAttEsc } );	
			
			var poiNotesContainer = poiNodes[i].getElementsByTagName("NOTES")[0];
			if (poiNotesContainer) {
				var poiNotes = poiNotesContainer.getElementsByTagName("NOTE"); 
				for (var k = 0, m = poiNotes.length; k < m; k++) {
					var noteIDAttEsc = unescape(poiNotes[k].getAttribute("ID"));
					var noteNameAttEsc = unescape(poiNotes[k].getAttribute("NAME"));
					var noteTextEsc = unescape(poiNotes[k].getAttribute("TEXT"));
					noteListDP.push( { text:noteNameAttEsc, value:noteIDAttEsc, noteText:noteTextEsc, poiID:poiIDAttEsc } );		
				}
			} 
			
			var poiLabelsContainer = poiNodes[i].getElementsByTagName("LABELS")[0]; 
			if (poiLabelsContainer) {
				var poiLabels = poiLabelsContainer.getElementsByTagName("LABEL"); 
				for (var n = 0, o = poiLabels.length; n < o; n++) {
					var labelNameAttEsc = unescape(poiLabels[n].getAttribute("NAME"));
					labelCounter++;
					poiLabels[n].setAttribute("INTERNALID", labelCounter.toString());	
					labelListDP.push( { text:labelNameAttEsc, value:labelCounter, poiID:poiIDAttEsc } );	
					
					// If hotspot is polygon do not substitute media and do not add media path to hotspotsMedia list to load.
					if (poiLabels[n].getAttribute("MEDIA") != "polygon") {
						// Determine if any internal graphic symbols are referenced due to hotspot or annotation 
						// XML not having being updated from prior use with Flash-based viewers.  
						if (poiLabels[n].getAttribute("MEDIATYPE") == "symbol") {
							var symbolMedia = poiLabels[n].getAttribute("MEDIA");
							var substituteMedia;
							
							annotationFolder = Z.annotationPath;
							if (Z.annotationPath.toLowerCase().substring(Z.annotationPath.length - 4, Z.annotationPath.length) == ".xml") {
								annotationFolder = annotationFolder.substring(0, annotationFolder.lastIndexOf("/"));
							}
							
							switch (symbolMedia) {
								case "circle":
									substituteMedia = annotationFolder + "/" + "circle.png";
									break;
								case "square":
									substituteMedia = annotationFolder + "/" + "square.png";
									break;
								case "triangle":
									substituteMedia = annotationFolder + "/" + "triangle.png";
									break;
								case "arrowDown":
									substituteMedia = annotationFolder + "/" + "arrowDown.png";
									break;
								case "arrowDownLeft":
									substituteMedia = annotationFolder + "/" + "arrowDownLeft.png";
									break;
								case "arrowLeft":
									substituteMedia = annotationFolder + "/" + "arrowLeft.png";
									break;
								case "arrowUpLeft":
									substituteMedia = annotationFolder + "/" + "arrowUpLeft.png";
									break;
								case "arrowUp":
									substituteMedia = annotationFolder + "/" + "arrowUp.png";
									break;
								case "arrowUpRight":
									substituteMedia = annotationFolder + "/" + "arrowUpRight.png";
									break;
								case "arrowRight":
									substituteMedia = annotationFolder + "/" + "arrowRight.png";
									break;
								case "arrowRightDown":
									substituteMedia = annotationFolder + "/" + "arrowRightDown.png";
									break;
								case "lineHorizontal":
									substituteMedia = annotationFolder + "/" + "lineHorizontal.png";
									break;
								case "lineVertical":
									substituteMedia = annotationFolder + "/" + "lineVertical.png";
									break;
								default:
									substituteMedia = annotationFolder + "/" + "noSubstitutePlaceholder.png";
							}

							// Substitute external for internal graphic reference to allow drawing of labels.
							poiLabels[n].setAttribute("MEDIA", substituteMedia);

							// Set flag if and display trace a warning to debug panel once, after all parsing is completed.
							mTypeLegacy = true;
						}

						// Record media required for all hotspots.  Duplicates removed below. 
						hotspotsMedia.push(poiLabels[n].getAttribute("MEDIA"));

					}
						
					// Create hotspots from label nodes and store. Labels are enhanced hotspots.  Maintain
					// consistency at level of hotspot array and display to allow unified codebase.
					var hotspot = new Hotspot(poiLabels[n]);
					hotspots.push(hotspot);					
				}
			}
		}
		
		sortLabelArrays();
		
		// Debug option: Show one error for Flash library media, if referenced. 
		//if (mTypeLegacy) { Z.Utils.showMessage(Z.Utils.getResource("ERROR_HOTSPOTMEDIAINVALID")); }
		
		// Set initial visibility state of hotspots display. Now parsing XML so this is initial state, not redisplay or toggle. 
		hS.visibility = (hotspotsInitialVisibility) ? "visible" : "hidden";
		
		// Create POI, Note, and Label choice lists and Note textbox.
		createAnnotationPanel();
		
		// Next line is not required as POI choice list handler must be called to ensure Label and 
		// Note choice lists are correctly set and default value of POI choice list will not be a
		// simple title as with hotspots choice list ("Hotspots") so list handler will be called and
		// updateView call will occur which will load hotspots after hotspots array is filled.
		//displayHotspotsWithoutMedia();
				
		// Load image file(s) for hotspot graphics. On each load, relevant hotspot(s) will be created.
		hotspotsMedia.sort();
		hotspotsMedia = Z.Utils.removeDups(hotspotsMedia);	
		loadHotspotsMedia(hotspotsMedia);
	};	
	
	function validateAnnotationsXML (xmlDocIn) {		
		var temp, tempNode;
		var imageCenterX = Z.imageW / 2;
		var imageCenterY = Z.imageH  / 2;

		// Create XML doc to transfer input values into.
		var xmlText = "<ZAS></ZAS>";
		var xmlDocOut = Z.Utils.convertXMLTextToXMLDoc(xmlText);
		var xmlRootOut = xmlDocOut.getElementsByTagName("ZAS")[0];
		
		// Ensure XML structure for label setup information is complete.
		var labelSetupOut = xmlDocOut.createElement("LABELSETUP");
		labelSetupOut.setAttribute("PANELPOSITION","2"); 
		labelSetupOut.setAttribute("INITIALVISIBILITY","1"); 
		labelSetupOut.setAttribute("NOTEVISIBILITY","1"); 
		labelSetupOut.setAttribute("MINSCALE","1"); 
		labelSetupOut.setAttribute("MAXSCALE","1"); 
		xmlRootOut.appendChild(labelSetupOut);
		
		// Transfer data for LABELSETUP from loaded XML where fields exist.
		var labelSetupIn = xmlDocIn.getElementsByTagName("LABELSETUP")[0];
		
		temp = labelSetupIn.getAttribute("PANELPOSITION");
		if (Z.Utils.isStrVal(temp)) { labelSetupOut.setAttribute("PANELPOSITION", temp); }	
		
		var initVisAtt = labelSetupIn.getAttribute("INITIALVISIBILITY");		
		if (Z.Utils.isStrVal(initVisAtt)) { 
			var initVisDef = Z.Utils.getResource("DEFAULT_HOTSPOTSINITIALVISIBILITY");
			if (initVisDef) { 
				initVis = (initVisAtt != "0" && initVisAtt != "hide") ? "1" : "0"; // Default true.
			} else {
				initVis = (initVisAtt != "1" && initVisAtt != "show") ? "0" : "1"; // Default false.
			}
			labelSetupOut.setAttribute("INITIALVISIBILITY", initVis);
		}
		
		var initVisAtt = labelSetupIn.getAttribute("NOTEVISIBILITY");		
		if (Z.Utils.isStrVal(initVisAtt)) { 
			var initVisDef = Z.Utils.getResource("DEFAULT_ANNOTATIONNOTEVISIBILITY");
			if (initVisDef) { 
				initVis = (initVisAtt != "0" && initVisAtt != "hide") ? "1" : "0"; // Default true.
			} else {
				initVis = (initVisAtt != "1" && initVisAtt != "show") ? "0" : "1"; // Default false.
			}
			labelSetupOut.setAttribute("NOTEVISIBILITY", initVis);
		}		
	
		temp = labelSetupIn.getAttribute("MINSCALE");
		if (Z.Utils.isStrVal(temp)) { 
			if (!isNaN(parseFloat(temp)) && parseFloat(temp) > 0) { 
				labelSetupOut.setAttribute("MINSCALE", temp);
			}
		}
	
		temp = labelSetupIn.getAttribute("MAXSCALE");
		if (Z.Utils.isStrVal(temp)) { 
			if (!isNaN(parseFloat(temp)) && parseFloat(temp) > 0) { 
				labelSetupOut.setAttribute("MAXSCALE", temp);
			}
		}		
		
		var poiNodesIn = xmlDocIn.getElementsByTagName("POI"); 		
		for (var i = 0, j = poiNodesIn.length; i < j; i++) {
		
			// Ensure POI XML structure is complete.
			var poiOut = xmlDocOut.createElement("POI");
			poiOut.setAttribute("ID","0"); 
			poiOut.setAttribute("NAME", Z.Utils.getResource("CONTENT_POINAME")); 
			poiOut.setAttribute("X","center");  
			poiOut.setAttribute("Y","center");  
			poiOut.setAttribute("ZOOM","-1");  
			poiOut.setAttribute("USER", Z.Utils.getResource("CONTENT_POIUSER"));  
			poiOut.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());
			xmlRootOut.appendChild(poiOut);			

			// Transfer data for POI from loaded XML where fields exist.
			var poiIn = xmlDocIn.getElementsByTagName("POI")[i];	
			
			temp = poiIn.getAttribute("ID");
			if (Z.Utils.isStrVal(temp)) { poiOut.setAttribute("ID", temp); }	
			temp = poiIn.getAttribute("NAME");
			if (Z.Utils.isStrVal(temp)) { poiOut.setAttribute("NAME", temp); }	
			temp = poiIn.getAttribute("X");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiOut.setAttribute("X", ((temp == "center") ? imageCenterX.toString() : temp)); 
			}
			temp = poiIn.getAttribute("Y");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiOut.setAttribute("Y", ((temp == "center") ? imageCenterY.toString() : temp)); 
			}
			temp = poiIn.getAttribute("ZOOM");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiOut.setAttribute("ZOOM", temp); 
			}
			temp = poiIn.getAttribute("USER");
			if (Z.Utils.isStrVal(temp)) { poiOut.setAttribute("USER", temp); }
			temp = poiIn.getAttribute("DATE");
			if (Z.Utils.isStrVal(temp)) { poiOut.setAttribute("DATE", temp); }
			
			xmlRootOut.appendChild(poiOut);
			poiOut = xmlRootOut.getElementsByTagName("POI")[i];
			
			var poiNotesContainerIn = poiNodesIn[i].getElementsByTagName("NOTES")[0]; 
			if (poiNotesContainerIn) {
				var poiNotesContainerOut = xmlDocOut.createElement("NOTES");
				poiOut.appendChild(poiNotesContainerOut);
				
				var poiNotesIn = poiNotesContainerIn.getElementsByTagName("NOTE"); 
				for (var k = 0, m = poiNotesIn.length; k < m; k++) {
		
					// Ensure NOTE XML structure is complete.
					var noteOut = xmlDocOut.createElement("NOTE");
					noteOut.setAttribute("ID","0"); 
					noteOut.setAttribute("NAME", Z.Utils.getResource("CONTENT_NOTENAME")); 
					noteOut.setAttribute("TEXT", Z.Utils.getResource("CONTENT_NOTETEXT"));   
					noteOut.setAttribute("USER", Z.Utils.getResource("CONTENT_NOTEUSER"));  
					noteOut.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());
					poiNotesContainerOut.appendChild(noteOut);

					// Transfer data for NOTE from loaded XML where fields exist.
					var noteIn = poiNotesContainerIn.getElementsByTagName("NOTE")[k];	

					temp = noteIn.getAttribute("ID");
					if (Z.Utils.isStrVal(temp)) { noteOut.setAttribute("ID", temp); }	
					temp = noteIn.getAttribute("NAME");
					if (Z.Utils.isStrVal(temp)) { noteOut.setAttribute("NAME", temp); }	
					temp = noteIn.getAttribute("TEXT");
					if (Z.Utils.isStrVal(temp)) { noteOut.setAttribute("TEXT", temp); }	
					temp = noteIn.getAttribute("USER");
					if (Z.Utils.isStrVal(temp)) { noteOut.setAttribute("USER", temp); }	
					temp = noteIn.getAttribute("DATE");
					if (Z.Utils.isStrVal(temp)) { noteOut.setAttribute("DATE", temp); }

					poiNotesContainerOut.appendChild(noteOut);
				}
			}	
						
			var poiLabelsContainerIn = poiNodesIn[i].getElementsByTagName("LABELS")[0]; 
			if (poiLabelsContainerIn) {
				var poiLabelsContainerOut = xmlDocOut.createElement("LABELS");
				poiOut.appendChild(poiLabelsContainerOut);
				
				var poiLabelsIn = poiLabelsContainerIn.getElementsByTagName("LABEL"); 
				for (var n = 0, o = poiLabelsIn.length; n < o; n++) {
				
					// Ensure LABEL XML structure is complete.
					var labelOut = xmlDocOut.createElement("LABEL");
					
					labelOut.setAttribute("INTERNALID","0"); 
					labelOut.setAttribute("ID","0"); 
					labelOut.setAttribute("NAME", Z.Utils.getResource("CONTENT_LABELNAME")); 
					labelOut.setAttribute("MEDIATYPE", "url");  
					labelOut.setAttribute("MEDIA", "circle");  
					labelOut.setAttribute("X", "center");  
					labelOut.setAttribute("Y", "center");  
					labelOut.setAttribute("ZOOM", "100"); 
					labelOut.setAttribute("XSCALE", "100"); 
					labelOut.setAttribute("YSCALE", "100"); 
					labelOut.setAttribute("URL", ""); 
					labelOut.setAttribute("URLTARGET", "_blank"); 
					labelOut.setAttribute("ROLLOVER", "0"); 
					labelOut.setAttribute("CAPTION", ""); 
					labelOut.setAttribute("TOOLTIP", ""); 					
					labelOut.setAttribute("USER", Z.Utils.getResource("CONTENT_LABELUSER"));  
					labelOut.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());
					labelOut.setAttribute("TOOLTIP", ""); 				
					labelOut.setAttribute("TEXTCOLOR", Z.Utils.getResource("CONTENT_ANNOTATIONSCAPTIONTEXTCOLOR")); 
					labelOut.setAttribute("BACKCOLOR", Z.Utils.getResource("CONTENT_ANNOTATIONSCAPTIONBACKCOLOR")); 
					labelOut.setAttribute("BACKVISIBLE", Z.Utils.getResource("CONTENT_ANNOTATIONSCAPTIONBACKVISIBLE"));
					labelOut.setAttribute("LINECOLOR", Z.Utils.getResource("CONTENT_POLYGONLINECOLOR")); 
					labelOut.setAttribute("FILLCOLOR", Z.Utils.getResource("CONTENT_POLYGONFILLCOLOR"));  
					labelOut.setAttribute("LINEVISIBLE", Z.Utils.getResource("CONTENT_POLYGONLINEVISIBLE")); 
					labelOut.setAttribute("FILLVISIBLE", Z.Utils.getResource("CONTENT_POLYGONFILLVISIBLE")); 
					labelOut.setAttribute("CAPTIONPOSITION", Z.Utils.getResource("CONTENT_ANNOTATIONSCAPTIONPOSITION")); 	

					poiLabelsContainerOut.appendChild(labelOut);

					// Transfer data for LABEL from loaded XML where fields exist.
					var labelIn = poiLabelsContainerIn.getElementsByTagName("LABEL")[n];
					
					temp = labelIn.getAttribute("ID");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("ID", temp); }	
					temp = labelIn.getAttribute("NAME");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("NAME", temp); }
					temp = labelIn.getAttribute("MEDIATYPE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("MEDIATYPE", temp); }
					temp = labelIn.getAttribute("MEDIA");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("MEDIA", temp); }
					temp = labelIn.getAttribute("X");
					if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
						labelOut.setAttribute("X", ((temp == "center") ? imageCenterX.toString() : temp)); 
					}
					temp = labelIn.getAttribute("Y");
					if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
						labelOut.setAttribute("Y", ((temp == "center") ? imageCenterY.toString() : temp)); 
					}					
					temp = labelIn.getAttribute("ZOOM");
					if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) {
						labelOut.setAttribute("ZOOM", temp); 
					}
					temp = labelIn.getAttribute("XSCALE");
					if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
						labelOut.setAttribute("XSCALE", temp); 
					}
					temp = labelIn.getAttribute("YSCALE");
					if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
						labelOut.setAttribute("YSCALE", temp);  
					}
					temp = labelIn.getAttribute("URL");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("URL", temp); }
					temp = labelIn.getAttribute("URLTARGET");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("URLTARGET", temp); }
					temp = labelIn.getAttribute("ROLLOVER");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("ROLLOVER", temp); }
					temp = labelIn.getAttribute("CAPTION");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("CAPTION", temp); }
					temp = labelIn.getAttribute("TOOLTIP");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("TOOLTIP", temp); }
					temp = labelIn.getAttribute("USER");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("USER", temp); }
					temp = labelIn.getAttribute("DATE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("DATE", temp); }


					// DEV NOTE: Duplicate complex field properties. Support TBD.
					temp = labelIn.getAttribute("TEXTCOLOR");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("TEXTCOLOR", temp); }
					temp = labelIn.getAttribute("BACKCOLOR");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("BACKCOLOR", temp); }
					temp = labelIn.getAttribute("LINECOLOR");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("LINECOLOR", temp); }
					temp = labelIn.getAttribute("FILLCOLOR");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("FILLCOLOR", temp); }
					temp = labelIn.getAttribute("TEXTVISIBLE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("TEXTVISIBLE", temp); }
					temp = labelIn.getAttribute("BACKVISIBLE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("BACKVISIBLE", temp); }
					temp = labelIn.getAttribute("LINEVISIBLE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("LINEVISIBLE", temp); }
					temp = labelIn.getAttribute("FILLVISIBLE");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("FILLVISIBLE", temp); }
					temp = labelIn.getAttribute("CAPTIONPOSITION");
					if (Z.Utils.isStrVal(temp)) { labelOut.setAttribute("CAPTIONPOSITION", temp); }
					
					// DEV NOTE: Duplicate complex field content. Support TBD.
					
					tempNode = labelIn.getElementsByTagName("CAPTION")[0];
					if (tempNode != undefined) { labelOut.appendChild(tempNode); }
					tempNode = labelIn.getElementsByTagName("TOOLTIP")[0];
					if (tempNode != undefined) { labelOut.appendChild(tempNode); }
					tempNode = labelIn.getElementsByTagName("POLYGON")[0];
					if (tempNode != undefined) { labelOut.appendChild(tempNode); }
					
					poiLabelsContainerOut.appendChild(labelOut);
				}
			}
		}
		
		// Debug option: Z.Utils.convertXMLDocToXMLText(xmlDocOut);
		return xmlDocOut;
	};
	
	function sortLabelArrays () {
		labelListDP.sort(sortAssocArrayByLabelField);
		labelListCurrentDP.sort(sortAssocArrayByLabelField);
	};
		
	function sortAssocArrayByLabelField (objA, objB) {
		var stringA = objA.text.toLowerCase();
		var stringB = objB.text.toLowerCase();
		var result = 0;
		if(stringA < stringB) {
			result = -1;
		} else if(stringA > stringB) {
			result = 1;
		}
		return result;
	};
	
	function createAnnotationPanel () {
		var marginLabel = 9, marginNote = 9, marginList = 51, marginTop = 12, divider = 25, labelW = 40, labelH = 20, labelDivider = 5;
		var panelW = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELWIDTH"), 10);
		var panelH = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELHEIGHT"), 10);
		
		// If Note choicelist and text field hidden, reduce panel vertical size.
		if (!noteVisibility) { panelH -= 131; }
		
		var listW = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONLISTWIDTH"), 10);
		var noteW = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONNOTEWIDTH"), 10);
		var noteH = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONNOTEHEIGHT"), 10);
		var panelCoords = getAnnotationPanelCoords(annotationPanelPosition, panelW, panelH, viewW, viewH); // viewH allows for toolbar height if static in viewer display area.
		var visible = (annotationPanelPosition == "0") ? "hidden" : "visible";
		
		// Clear preexisting lists, if any.
		var oldPoiList = document.getElementById("poiList");
		if (oldPoiList) { Z.AnnotationPanelDisplay.removeChild(oldPoiList); }
		var oldLabelList = document.getElementById("labelList");
		if (oldLabelList) { Z.AnnotationPanelDisplay.removeChild(oldLabelList); }
		var oldNoteList = document.getElementById("noteList");
		if (oldNoteList) { Z.AnnotationPanelDisplay.removeChild(oldNoteList); }
		
		// Create panel to contain lists and notes text box.
		if (!Z.AnnotationPanelDisplay) {
			Z.AnnotationPanelDisplay = Z.Utils.createContainerElement("div", "AnnotationPanelDisplay", "inline-block", "absolute", "hidden", panelW + "px", panelH + "px", panelCoords.x + "px", panelCoords.y + "px", "solid", "1px", "transparent none", "0px", "0px", "normal", "default");
			annD = Z.AnnotationPanelDisplay;
			annS = annD.style;
		}

		// Create background.
		var annotationPanelBackAlpha = parseFloat(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELBACKALPHA"));
		var annotationPanelBackColor = Z.Utils.getResource("DEFAULT_ANNOTATIONPANELBACKCOLOR");
		var annotationPanelBackColorNoAlpha = Z.Utils.getResource("DEFAULT_ANNOTATIONPANELBACKCOLORNOALPHA");
		var annotationPanelBackground = Z.Utils.createContainerElement("div", "annotationPanelBackground", "inline-block", "absolute", "hidden", panelW + "px", panelH + "px", "0px", "0px", "none", "0px", annotationPanelBackColor, "0px", "0px", "normal");
		Z.Utils.setOpacity(annotationPanelBackground, annotationPanelBackAlpha, annotationPanelBackColorNoAlpha);

		// Create labels for POI, Note, and Label choice lists.		
		var labelFontSize = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONPANELLABELFONTSIZE"), 10);
		var labelPOITextBox = Z.Utils.createContainerElement("div", "labelPOITextBox", "inline-block", "absolute", "hidden", labelW + "px", labelH + "px", marginLabel + "px", (marginTop + labelDivider) + "px", "none", "0px", "transparent none", "0px", "0px", "nowrap");
		var labelPOITextNode = document.createTextNode(Z.Utils.getResource("UI_ANNOTATIONPANELLABELPOI"));
		labelPOITextBox.appendChild(labelPOITextNode);
		Z.Utils.setTextStyle(labelPOITextNode, "black", "verdana", labelFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
		var labelLabelTextBox = Z.Utils.createContainerElement("div", "labelLabelTextBox", "inline-block", "absolute", "hidden", labelW + "px", labelH + "px", marginLabel + "px", (marginTop + divider + labelDivider) + "px", "none", "0px", "transparent none", "0px", "0px", "nowrap");
		var labelLabelTextNode = document.createTextNode(Z.Utils.getResource("UI_ANNOTATIONPANELLABELLABEL"));
		labelLabelTextBox.appendChild(labelLabelTextNode);
		Z.Utils.setTextStyle(labelLabelTextNode, "black", "verdana", labelFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
		var labelNoteTextBox = Z.Utils.createContainerElement("div", "labelNoteTextBox", "inline-block", "absolute", "hidden", labelW + "px", labelH + "px", marginLabel + "px", (marginTop + (divider * 2) + labelDivider) + "px", "none", "0px", "transparent none", "0px", "0px", "nowrap");
		var labelNoteTextNode = document.createTextNode(Z.Utils.getResource("UI_ANNOTATIONPANELLABELNOTE"));
		labelNoteTextBox.appendChild(labelNoteTextNode);
		Z.Utils.setTextStyle(labelNoteTextNode, "black", "verdana", labelFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");
		
		// Create placeholder array to fill dependent choice lists until default POI selection filters data providers and refills.
		var placeHolderListText = Z.Utils.getResource("CONTENT_ANNOTATIONPLACEHOLDERLISTTEXT");
		var placeholderDP = [ { text:placeHolderListText, value:"0" } ];	
		
		// Create choice lists.
		poiList = new Z.Utils.createSelectElement("poiList", "", placeholderDP, listW, marginList, marginTop, visible, poiListChangeHandler);
		labelList = new Z.Utils.createSelectElement("labelList", "", placeholderDP, listW, marginList, marginTop + divider, visible, labelListChangeHandler);
		
		if (noteVisibility) {
			noteList = new Z.Utils.createSelectElement("noteList", "", placeholderDP, listW, marginList, marginTop + (divider * 2), visible, noteListChangeHandler);

			// Create note text node and container.
			var placeHolderNoteText = Z.Utils.getResource("CONTENT_ANNOTATIONPLACEHOLDERNOTETEXT");
			var padding = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONNOTEPADDING"), 10);
			var noteFontSize = parseInt(Z.Utils.getResource("DEFAULT_ANNOTATIONNOTEFONTSIZE"), 10);
			var noteTextElement = Z.Utils.createTextElement("noteTextArea", placeHolderNoteText, noteW + "px", noteH + "px", marginNote + "px", (marginTop + (divider * 3) + 3) + "px", padding + "px", "solid", "1px", "auto", true, "verdana", noteFontSize + "px", "none");
		}
	
		// Add all elements to Panel, then add Panel to Viewer.
		Z.AnnotationPanelDisplay.appendChild(annotationPanelBackground);
		Z.AnnotationPanelDisplay.appendChild(labelPOITextBox);
		Z.AnnotationPanelDisplay.appendChild(labelLabelTextBox);
		Z.AnnotationPanelDisplay.appendChild(poiList);
		Z.AnnotationPanelDisplay.appendChild(labelList);	
		if (noteList) { 
			Z.AnnotationPanelDisplay.appendChild(labelNoteTextBox);
			Z.AnnotationPanelDisplay.appendChild(noteList);
			Z.AnnotationPanelDisplay.appendChild(noteTextElement);
		}
		Z.ViewerDisplay.appendChild(Z.AnnotationPanelDisplay);
		
		// Fill choice lists based on default (first) POI selection.
		Z.Utils.updateSelectElement(poiList, poiListDP);
		poiListChangeHandler();
	};
	
	function getAnnotationPanelCoords (position, panelW, panelH, viewerW, viewerH) {
		// Annotation panel positioning: 0 hides, 1 top left, 2 top-right, 3 bottom right, 4 bottom left
		// Note that viewerH  allows for toolbar height if static in viewer display area, but panelH
		// requires additional adjustment to Y position of panel if position is at bottom of viewer. 
		var panelX, panelY;
		var margin = 15;
		switch (position) {
			case "0": 
				panelX = 0;
				panelY = 0;
				break;
			case "1":
				panelX = margin;
				panelY = margin;
				break;
			case "2":
				panelX = viewerW - panelW - margin;
				panelY = margin;
				break;
			case "3":
				panelX = viewerW - panelW - margin;
				if (toolbar != null) {
					panelY = viewerH - panelH - margin;
				} else {
					panelY = viewerH - margin;
				}
				break;
			case "4":
				panelX = margin;
				if (toolbar != null) {
					panelY = viewerH - panelH - margin;
				} else {
					panelY = viewerH - margin;
				}
				break;			
			default:
				panelX = viewerW - panelW - margin;
				panelY = margin;	
		}
		return new Z.Utils.Point(panelX, panelY);
	};
	
	function addLabelToChoiceList (name, hotspotInternalID, poiIDVal) {
		labelListDP.push( { text:name, value:hotspotInternalID, poiID:poiIDVal } );
		labelListCurrentDP.push( { text:name, value:hotspotInternalID, poiID:poiIDVal } );
		var labelList = document.getElementById("labelList");	
		Z.Utils.updateSelectElement(labelList, labelListCurrentDP);
		labelList.selectedIndex = labelList.length - 1; 		
	};
	
	function removeLabelFromChoiceList (hotspotInternalID) {
		var labelList = document.getElementById("labelList");
		if (labelList != null) { 
			var index = labelListDP.indexOfObjectValue("value", hotspotInternalID);
			if (index != -1) { labelListDP.splice(index, 1); }
			
			var index = labelListCurrentDP.indexOfObjectValue("value", hotspotInternalID);
			if (index != -1) { 
				labelListCurrentDP.splice(index, 1); 
				Z.Utils.updateSelectElement(labelList, labelListCurrentDP);
				var labLen = labelList.length;
				if (labLen != 0) {
					labelList.selectedIndex = (index > labLen - 1) ? labLen - 1 : index; 
				}
			}
		}
	};
	
		
	
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::: HOTSPOT & ANNOTATION EVENT FUNCTIONS ::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
			
	function hotspotMouseOverHandler (event) {
		var event = Z.Utils.event(event);
		if (event) {
			var target = Z.Utils.target(event);
			// Allow for non-IE browsers and IE respectively.
			if (Z.browser != Z.browsers.IE && target && Z.Utils.isStrVal(target.id)) {
				setHotspotVisibility(target, true);
			} else if (Z.browser == Z.browsers.IE) {
				if (target.parentNode.parentNode && target.parentNode.parentNode.id.indexOf("hot") != -1) { // Image inside click-link anchor.
					setHotspotVisibility(target.parentNode.parentNode, true);
				} else if (target.parentNode.parentNode.parentNode && target.parentNode.parentNode.parentNode.id.indexOf("hot") != -1) { // No click-link anchor.
					setHotspotVisibility(target.parentNode.parentNode.parentNode, true);				
				}	
			}
		}
	};

	function hotspotMouseOutHandler (event) {
		var event = Z.Utils.event(event);
		if (event) {
			var target = Z.Utils.target(event);
			var relatedTarget = Z.Utils.relatedTarget(event);
			// Allow for non-IE browsers and IE differently.
			if ((Z.browser != Z.browsers.IE && relatedTarget && Z.Utils.isStrVal(relatedTarget.id)) || (Z.browser == Z.browsers.IE && target.parentNode.parentNode.parentNode && Z.Utils.isStrVal(target.parentNode.parentNode.parentNode.id))) {
				if (target.parentNode.parentNode && target.parentNode.parentNode.id.indexOf("hot") != -1) { // Image inside click-link anchor.
					setHotspotVisibility(target.parentNode.parentNode, false);
				} else if (target.parentNode.parentNode.parentNode && target.parentNode.parentNode.parentNode.id.indexOf("hot") != -1) { // No click-link anchor.
					setHotspotVisibility(target.parentNode.parentNode.parentNode, false);				
				}			
			}
		}
	};

	function hotspotMouseDownHandler (event) {
		// DEV NOTE: Alternative to href click effect implementation. See notes above commented handlers in drawHotspotInHTML function.
	};

	function hotspotMouseUpHandler (event) {
		// DEV NOTE: Alternative to href click effect implementation. See notes above commented handlers in drawHotspotInHTML function.
		// If using mouse down handler may need to track distance and/or time to verify click of hotspot is not click-drag of image.
	};	

	function hotspotTouchStartHandler (event) {
		// DEV NOTE: Alternative to href click effect implementation. See notes above commented handlers in drawHotspotInHTML function.
	};

	function hotspotTouchEndHandler (event) {
		// DEV NOTE: Alternative to href click effect implementation. See notes above commented handlers in drawHotspotInHTML function.
		// If using mouse down handler may need to track distance and/or time to verify click of hotspot is not click-drag of image.
	};

	function hotspotTouchCancelHandler (event) {
		// DEV NOTE: Alternative to href click effect implementation. See notes above commented handlers in drawHotspotInHTML function.
		// If using mouse down handler may need to track distance and/or time to verify click of hotspot is not click-drag of image.
	};

	function hotspotListChangeHandler (event) {		
		var selectedID = "0";
		var event = Z.Utils.event(event);
		if (event) {
			var target = Z.Utils.target(event);
			var selectedID = target.options[target.selectedIndex].value;
		}
		if (Z.Utils.isStrVal(selectedID)) {
			var index = hotspots.indexOfObjectValue("id", selectedID);
			if (index != -1 ) { self.zoomAndPanToView(hotspots[index].x, hotspots[index].y, (hotspots[index].zoom / 100)); }
		}
		
		//Debugging options: Hotspot API features can be tested here, using hotspots choicelist change handler. 
		//self.createHotspot("200", "Test", "url", "Assets/Hotspots/hotspotFromJPG.jpg", "250", "250", "100", "100","100", "http://www.zoomify.com", "_self", "false", "Test Caption", "This is a test tooltip.");
		//self.setHotspotsVisibilityByFilter("name", "Hotspot Without Click Link", false);
		//self.setHotspotVisibilityByID("3", false);
	};

	function poiListChangeHandler (event) {
		var selectedPOIID = "0";
		var event = Z.Utils.event(event);
		if (event) {
			var target = Z.Utils.target(event);
			selectedPOIID = target.options[target.selectedIndex].value;
		}
		
		// Set view to coordinates of selected POI.	
		if (Z.Utils.isStrVal(selectedPOIID)) {
			var index = poiListDP.indexOfObjectValue("value", selectedPOIID);
			if (index != -1) {  
				var imageCenterX = Z.imageW / 2;
				var imageCenterY = Z.imageH  / 2;
				var temp;

				temp = poiListDP[index].x;
				var X = (temp == "center") ? imageCenterX : parseFloat(temp);
				temp = poiListDP[index].y;
				var Y = (temp == "center") ? imageCenterY : parseFloat(temp);
				temp = poiListDP[index].zoom;
				var Zoom = (temp == "-1") ? Z.fitZ : parseFloat(temp);
				
				// Update view to current POI coordinates with exception of first load.
				if (!annotationPanelInitialized) {
					annotationPanelInitialized = true;
					redisplayHotspots();
				} else {
					self.zoomAndPanToView(X, Y, (Zoom / 100)); 
				}
			}
		}
		
		// Update Label and Note choicelists to filter by selected POI.
		labelListCurrentDP = filterListByPOIID(labelListDP, selectedPOIID);
		Z.Utils.updateSelectElement(labelList, labelListCurrentDP);
		if (noteList) {
			noteListCurrentDP = filterListByPOIID(noteListDP, selectedPOIID);
			Z.Utils.updateSelectElement(noteList, noteListCurrentDP);
			// Update Note text display.
			noteListChangeHandler();
		}
		
		// Update current hotspot tracking variable for editing use.
		if (Z.editMode) {
			hotspotCurrentID = parseInt(labelList.options[labelList.selectedIndex].value);
		}
	};

	function labelListChangeHandler (event) {
		var event = Z.Utils.event(event);
		var target = Z.Utils.target(event);
		
		var selectedLabelID = target.options[target.selectedIndex].value;		
		if (selectedLabelID !== null) {
			
			// Set current hotspot tracking variable for editing use.
			hotspotCurrentID = parseInt(selectedLabelID);
			polygonClosed = true;
			
			var index = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
			if (index != -1) {
				var imageCenterX = Z.imageW / 2;
				var imageCenterY = Z.imageH  / 2;
				var temp;

				temp = hotspots[index].x;
				var X = (temp == "center") ? imageCenterX : parseFloat(temp);
				temp = hotspots[index].y;
				var Y = (temp == "center") ? imageCenterY : parseFloat(temp);
				temp = hotspots[index].zoom;
				var Zoom = (temp == "-1") ? Z.fitZ : parseFloat(temp);
				
				if (!Z.polygonEditing) { 
					self.zoomAndPanToView(X, Y, (Zoom / 100)); 
				} else {
					redisplayHotspots();
				}
			}
		}
	};
	
	function noteListChangeHandler (event) {
		// Clear note text in case no notes exist for new choice list selection.
		var noteTextArea = document.getElementById("noteTextArea");
		noteTextArea.value = "";		
		var selectedNoteID = "0";
		var event = Z.Utils.event(event);
		if (event) {
			var target = Z.Utils.target(event);
			selectedNoteID = target.options[target.selectedIndex].value;
		} else {
			if (noteListCurrentDP.length > 0) { selectedNoteID = noteListCurrentDP[0].value; }
		}
		if (Z.Utils.isStrVal(selectedNoteID)) {
			var index = noteListCurrentDP.indexOfObjectValue("value", selectedNoteID);
			if (index != -1) { noteTextArea.value = noteListCurrentDP[index].noteText; }
		}
	};
	
	function filterListByPOIID (dependentArray, poiID) {
		var outputArray = [];
		for (var i = 0, j = dependentArray.length; i < j; i++) {
			if (dependentArray[i].poiID == poiID) {
				outputArray.push(dependentArray[i]);
			}
		} 
		return outputArray;
	};
	
	
	
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::: HOTSPOT POLYGON FUNCTIONS ::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::	
	
	function drawPolygonOnCanvas (hotspot, hC) {
		// Verify browser supports canvas as required by polygon implementation.
		if (Z.useCanvas) {	
			// Draw polygon on drawing canvas unless is polygon of current hotspot and
			// it is currently being edited, in which case, draw on editing canvas.
			var hotspotInternalID = hotspot.internalID;

			if (!Z.polygonEditing || hotspotInternalID !== hotspotCurrentID) {
				targetCtx = dCtx;
			} else {
				targetCtx = eCtx;
			}
			
			// Record scale and translation state to return to after temporary changes.
			targetCtx.save();
			
			// Temporarily change center point of canvas.
			targetCtx.translate((hotspot.x - Z.imageX) * Z.imageZ, (hotspot.y - Z.imageY) * Z.imageZ);
						
			// Temporarily change scale of canvas to implement scaling of polygon set of control points (vertices).
			var newScale = tierScale / tierScalePrior;
			var polyScaleX = (hC.constrainedScale * ((hotspot.xScale / 100) / (hotspot.zoom / 100))) / newScale;
			var polyScaleY = (hC.constrainedScale * ((hotspot.yScale / 100) / (hotspot.zoom / 100))) / newScale;
			targetCtx.scale(polyScaleX, polyScaleY);
			
			// Draw polygon.		
			var polyPts = hotspot.polygonPts;
			var x = hotspot.x;
			var y = hotspot.y;
				
			targetCtx.lineWidth = polygonLineW
			if (!hotspot.fillVisible || !polygonClosed) { targetCtx.lineWidth *= 3; }
			
			targetCtx.strokeStyle = hotspot.lineColor;
			targetCtx.fillStyle = hotspot.fillColor;

			targetCtx.beginPath();			
			var firstPolyPtX = polyPts[0].x - x;
			var firstPolyPtY = polyPts[0].y - y;		
			targetCtx.moveTo(firstPolyPtX, firstPolyPtY);

			for (var i = 1, j = polyPts.length; i < j; i++) {
				var polyPtX = polyPts[i].x - x;
				var polyPtY = polyPts[i].y - y;
				targetCtx.lineTo(polyPtX, polyPtY);
			}
			
			if (polygonClosed || hotspotInternalID != hotspotCurrentID || (mouseIsDown && controlPointCurrent == 0)) {
				targetCtx.lineTo(firstPolyPtX, firstPolyPtY);
				targetCtx.closePath();
				if (hotspot.fillVisible && (polygonClosed || hotspotInternalID != hotspotCurrentID)) {
					targetCtx.globalAlpha = 0.5;
					targetCtx.fill();
				}
				targetCtx.globalAlpha = 1;
			}
			targetCtx.stroke();

			// Draw polygon control points.
			var polyScaleAvg = (polyScaleX + polyScaleY) / 2;
			if (Z.polygonEditing && hotspot.internalID == hotspotCurrentID) {	
				for (var i = 0, j = polyPts.length; i < j; i++) {
					var polyPtX = polyPts[i].x - x;
					var polyPtY = polyPts[i].y - y;
					drawControlPoint(polyPtX, polyPtY, (!polygonClosed && i == 0), polyScaleAvg);	
				}
			}
			
			// Undo temporary changes to canvas scale and center point to reset canvas
			// to base scale before scaling & drawing other polygons, tiles, etc.
			targetCtx.restore();
			
		} else {
			if (!polygonsRequireCanvasAlertShown) {
				Z.Utils.showMessage(Z.Utils.getResource("ALERT_POLYGONSREQUIRECANVAS"));
				polygonsRequireCanvasAlertShown = true;
			}
		}
	};
	
	function drawControlPoint (x, y, firstCtrlPt, canvasScale) {
		var ctrlPtRadiusUnscaled = ctrlPtRadius;
		if (canvasScale !== undefined && canvasScale !== null) {
			ctrlPtRadiusUnscaled /= canvasScale;
		}
		
		eCtx.lineWidth = ctrlPtLineW;
		eCtx.strokeStyle = ctrlPtStrokeColor;
		eCtx.fillStyle = (firstCtrlPt) ? firstCtrlPtFillColor : stdCtrlPtFillColor;
		eCtx.beginPath();
		eCtx.arc(x, y, ctrlPtRadiusUnscaled, 0, Math.PI * 2, false);
		eCtx.closePath();
		eCtx.globalAlpha = 0.5;
		eCtx.fill();
		eCtx.globalAlpha = 1;
		eCtx.stroke();
	};

	this.togglePolygonEditing = function (override) {
		if (hotspotCurrentID !== null) {
			Z.polygonEditing = (override) ? override : !Z.polygonEditing;
			polygonCurrentPts = null;
			controlPointCurrent = null;
			controlPointDragging = false;			
			polygonClosed = true;
			redisplayPolygons(true);
		}
		
		// Reset visibility of editing buttons.
		var bEM = document.getElementById("buttonEditMode");
		if (bEM) { var bemS = bEM.style; }
		var bED = document.getElementById("buttonEditDelete");
		if (bED) { var bedS = bED.style; }
		var bEC = document.getElementById("buttonEditCancel");
		if (bEC) { var becS = bEC.style; }
		var bES = document.getElementById("buttonEditSave");
		if (bES) { var besS = bES.style; }
		if (bemS && becS && bedS && besS) {	
			if (Z.polygonEditing) { 
				Z.Toolbar.buttonGraphicsReset(bEM, "hidden");
				Z.Toolbar.buttonGraphicsReset(bED, "visible");
				Z.Toolbar.buttonGraphicsReset(bEC, "visible");
				Z.Toolbar.buttonGraphicsReset(bES, "visible");
			} else {
				Z.Toolbar.buttonGraphicsReset(bEM, "visible");
				Z.Toolbar.buttonGraphicsReset(bED, "hidden");
				Z.Toolbar.buttonGraphicsReset(bEC, "hidden");
				Z.Toolbar.buttonGraphicsReset(bES, "hidden");
			}
		}
		
		// Hide progress indicator if on mobile device as likely to overlap editing buttons.		
		if (Z.mobileDevice && Z.polygonEditing && Z.progressVisible) {
			Z.Toolbar.hideProgress();
		} else if (Z.progressVisible) {
			Z.Toolbar.showProgress();
		}
				
		if (Z.polygonEditing) { 			
			hotspotsRollback = Z.Utils.clone("hotspots", hotspots, hotspotsRollback);
			labelListDPRollback = Z.Utils.clone("labels", labelListDP, labelListDPRollback);
			
			// DEV NOTE: POI and Notes lists are not edited in current polygon editing
			// implementation and therefore do not need to be restored to pre-editing values.
			//poiListDPRollback = Z.Utils.clone("pois", poiListDP, poiListDPRollback);
			//noteListDPRollback = Z.Utils.clone("notes", noteListDP, noteListDPRollback);
		} else {
			Z.Utils.removeEventListener(document, "mousemove", viewerDisplayMouseMoveHandler); 
			
			if (!(override == false)) {
				Z.Utils.showMessage(Z.Utils.getResource("ALERT_SAVINGUNSAVEDEDITS"));
				this.saveAnnotations();
			}
		}
	};
	
	function drawPolygonBungeeLine (mPtX, mPtY) {
		clearDisplay(eD);
		var hC = new HotspotContext();
		var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
		if (hotspotCurrentIndex != -1) { 
			drawPolygonOnCanvas(hotspots[hotspotCurrentIndex], hC);
		
			var x = Z.imageX, y = Z.imageY, z = Z.imageZ;
			var polyPts = hotspots[hotspotCurrentIndex].polygonPts;
			var polyPtsLast = polyPts[polyPts.length-1];
			var polyPtX = (polyPtsLast.x - x) * z;
			var polyPtY = (polyPtsLast.y - y) * z;		
			
			if (!polygonClosed) {
				eCtx.lineWidth = ctrlPtLineW;
				eCtx.strokeStyle = ctrlPtStrokeColor;
				eCtx.moveTo(polyPtX, polyPtY);
				eCtx.lineTo(mPtX, mPtY);	
				eCtx.stroke();	
			}
		}
	};

	function redisplayPolygons(override) {
		// First clear polygons previously drawn.
		if (dD) { clearDisplay(dD); }
		if (eD) { clearDisplay(eD); }

		// Redraw polygons in view. Add polygonViewIncrement to ensure polygons partially in view are displayed.
		var hC = new HotspotContext();
		for (var i = 0, j = hotspots.length; i < j; i++) {
			if (hotspots[i].media == "polygon") { 
				var x = hotspots[i].x;
				var y = hotspots[i].y;
				if ((x + polygonViewIncrement) > hC.bounds.left && (x - polygonViewIncrement) < hC.bounds.right && (y + polygonViewIncrement) > hC.bounds.top && (y - polygonViewIncrement) < hC.bounds.bottom) {
					if (override || !Z.polygonEditing || hotspotCurrentID === null || hotspotCurrentID !== i) {
						drawPolygonOnCanvas(hotspots[i], hC);
					}
				}
			}
		}	
	};
	
	function updateControlPoints (hotspotInternalID, ctrlPtIndex, clickPt) {
		controlPointDragging = true;
		clearDisplay(eD);
		var hC = new HotspotContext();
		var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotInternalID);
		if (hotspotCurrentIndex != -1) { 
			hotspots[hotspotCurrentIndex].polygonPts[ctrlPtIndex] = clickPt;
			drawPolygonOnCanvas(hotspots[hotspotCurrentIndex], hC);
		}
	};
	
	function polygonClickHandler (event, clickZoomPt) {
		if (hotspotCurrentID === null) {
			// No current hotspot. No polygon. Clicked off control points. 
			// Create hotspot, polygon, and control point.  Make current.
			createControlPoint(null, true, clickZoomPt);
		} else {				
			var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
			if (hotspotCurrentIndex != -1) { 
				polygonCurrentPts = hotspots[hotspotCurrentIndex].polygonPts;
				if (polygonCurrentPts === null) {
					// Current hotspot. No polygon. Clicked off control points (none). 
					// Create polygon and control point.
					createControlPoint(hotspotCurrentID, true, clickZoomPt);
				} else {
					controlPointCurrent = getClickedControlPoint(event, clickZoomPt);
					if (!polygonClosed) {
						if (controlPointCurrent === null) {
							// Current hotspot. Existing polygon. Unclosed. Clicked off control points. 
							// Create control point in current polygon.
							createControlPoint(hotspotCurrentID, false, clickZoomPt);
						} else {
							if (controlPointCurrent == 0 && hotspots[hotspotCurrentIndex].polygonPts.length > 2) {
								// Current hotspot. Existing polygon. Unclosed. Clicked first control point. 
								// Close polygon.
								closePolygon(hotspotCurrentID);
							}
						}				
					} else {
						if (controlPointCurrent === null) {
							// Current hotspot. Existing polygon. Closed. Clicked off control points.
							// Create hotspot, polygon, and control point.  Make current.
							createControlPoint(null, true, clickZoomPt);
						}
					}
				}
			}
		}
	};
	
	function createControlPoint (hotspotInternalID, fullRedisplay, clickPt) {
		var firstCtrlPt = false;			
		var createdNewHotspot = false;
		if (hotspotInternalID === null) {
			var newHotspotInternalID = getFreeID("label");
			var newHotspotID = getFreeID("labelExternal");
			var xmlText = "<LABEL ID='" + newHotspotID.toString() + "' INTERNALID='" + newHotspotInternalID.toString() + "' NAME='Polygon " + newHotspotInternalID.toString() + "' MEDIATYPE='symbol' MEDIA='polygon' X='" + clickPt.x.toString() + "' Y='" + clickPt.y.toString() + "' ZOOM='" + "100" + "' XSCALE='100' YSCALE='100' URL='' URLTARGET='' ROLLOVER='0' CAPTION='' TOOLTIP='' LINECOLOR='ffffff' FILLCOLOR='999999' FILLVISIBLE='1' CAPTIONPOSITION='8' ><POLYGON><POINT X='" + clickPt.x.toString() + "' Y='" + clickPt.y.toString() + "' ></POINT></POLYGON></LABEL>"
			var xmlDoc = Z.Utils.convertXMLTextToXMLDoc(xmlText);
			var poiLabels = xmlDoc.getElementsByTagName("LABEL");
			var hotspot = new Hotspot(poiLabels[0]);
			poiCurrentID = poiList.options[poiList.selectedIndex].value;	
			hotspot.poiInternalID = poiCurrentID;	
			hotspot.saved = false;
			hotspots.push(hotspot);
			var poiID = poiList.options[poiList.selectedIndex].value;	
			hotspotCurrentID = newHotspotInternalID;
			addLabelToChoiceList(hotspot.name, hotspotCurrentID, poiID);
			createdNewHotspot = true;
			firstCtrlPt = true;
		} else {			
			var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotInternalID);
			if (hotspotCurrentIndex != -1) { 
				var polyPts = hotspots[hotspotCurrentIndex].polygonPts;
				polyPts.push( { x:clickPt.x, y:clickPt.y } );
				hotspots[hotspotCurrentIndex].polygonPts = polyPts;
				hotspots[hotspotCurrentIndex].saved = false;
			}
		}
		
		var polyPtX = (clickPt.x - Z.imageX) * Z.imageZ;
		var polyPtY = (clickPt.y - Z.imageY) * Z.imageZ;
		drawControlPoint (polyPtX, polyPtY, firstCtrlPt);
		polygonClosed = false;
		
		// Redisplay of hotspots occurs if new hotspot created to contain new polygon.
		// Redisplay of polygons occurs to redraw alll polygons and control points in order
		// to reselect current polygon, remove control points from any prior current polygon, 
		// and move prior current polygon to drawing canvas from editing canvas, and move 
		// new current polygon to editing canvas.
		if (createdNewHotspot) {
			redisplayHotspots();
		} else if (fullRedisplay) { 
			redisplayPolygons(); 
		}
	};
	
	function getClickedControlPoint (event, clickPt) {
		var polygonCtrlPtIndex = null;
		var ctrlPtRadiusScaled = (ctrlPtRadius + 1) / Z.imageZ;
		for (var i = 0, j = hotspots.length; i < j; i++) {
			if (hotspots[i].media == "polygon" && hotspots[i].internalID == hotspotCurrentID) {
				var polyPts = hotspots[i].polygonPts;
				for (var k = 0, m = polyPts.length; k < m; k++) {
					if (Z.Utils.calculatePointsDistance(clickPt.x, clickPt.y, polyPts[k].x, polyPts[k].y) < ctrlPtRadiusScaled) {
						polygonCtrlPtIndex = k;
					}
				}
			}
		}		
		return polygonCtrlPtIndex;
	};
	
	function closePolygon (hotspotInternalID) {			
		clearDisplay(eD);
		polygonClosed = true;
		var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotInternalID);
		if (hotspotCurrentIndex != -1) { 
			var polyCenter = Z.Utils.getCenterOfPolygonPoints(hotspots[hotspotCurrentIndex].polygonPts);
			hotspots[hotspotCurrentIndex].x = polyCenter.x;
			hotspots[hotspotCurrentIndex].y = polyCenter.y;
			hotspots[hotspotCurrentIndex].caption = "Polygon " + (hotspotInternalID.toString());
			var hC = new HotspotContext();
			displayHotspot(hotspots[hotspotCurrentIndex], hC);
		}
	};
	
	this.deleteCurrentLabel = function () {
		// Remove polygon from hotspot and labelList choicelist. If hotspot new for polygon, 
		// remove from hotspots array, annotationsXML variable, and annotations.xml file.
		removeLabelFromChoiceList(hotspotCurrentID);
		var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
		if (hotspotCurrentIndex != -1) { 		
			hotspots.splice(hotspotCurrentIndex, 1);
			if (hotspots.length > 0) {
				hotspotCurrentID = parseInt(labelList.options[labelList.selectedIndex].value);
			} else {
				hotspotCurrentID = null;
			}
			polygonCurrentPts = null;
			controlPointCurrent = null;
			redisplayHotspots();
		}
	};
	
	this.cancelLabelEdits = function () {
		Z.Utils.showMessage(Z.Utils.getResource("ALERT_CANCELLINGUNSAVEDEDITS"));
		// Reset hotspot and label arrays to content prior to editing.
		hotspots = Z.Utils.clone("hotspots", hotspotsRollback, hotspots);
		labelListDP = Z.Utils.clone("labels", labelListDPRollback, labelListDP);
		
		// DEV NOTE: POI and Notes lists are not edited in current polygon editing
		// implementation and therefore do not need to be restored to pre-editing values.
		//poiListDP = Z.Utils.clone("pois", poiListDPRollback, poiListDP);
		//noteListDP = Z.Utils.clone("notes", noteListDPRollback, noteListDP);
		
		// Restore Label and Note choicelists to filter by selected POI.
		var selectedPOIID = poiList.options[poiList.selectedIndex].value;
		labelListCurrentDP = filterListByPOIID(labelListDP, selectedPOIID);
		Z.Utils.updateSelectElement(labelList, labelListCurrentDP);
		hotspotCurrentID = parseInt(labelList.options[labelList.selectedIndex].value);
		
		// Restore hotspots display to contents prior to editing. 
		redisplayHotspots();
		
		this.togglePolygonEditing(false);
	};
	
	// Save edits to hotspots and polygons from current editing session and end editing session.
	this.saveAnnotations = function () {
		annotationsXML = updateAnnotationsXML(annotationsXML);
		if (Z.Utils.isStrVal(Z.saveHandlerPath)) {
			if(Z.saveHandlerPath.indexOf(Z.Utils.getResource("ALERT_SAVEDISABLEDFORDEMOKEY")) != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ALERT_SAVEDISABLEDFORDEMOTEXT"));
			} else {	
				var netConnector = new Z.NetConnector();
				netConnector.postXML(Z.saveHandlerPath, annotationsXML);
			}
		} else {
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_XMLSAVEHANDLERPATHINVALID"));
		}	
		this.togglePolygonEditing(false);
	};
	
	function updateAnnotationsXML (xmlDocPrior) {
		// Transfer POI, Note, and Label edits into XML to save.
		var temp, tempNode;
		var imageCenterX = Z.imageW / 2;
		var imageCenterY = Z.imageH  / 2;

		// Create XML doc to transfer input values into.
		var xmlTextNew = "<ZAS></ZAS>";
		var xmlDocNew = Z.Utils.convertXMLTextToXMLDoc(xmlTextNew);
		var xmlRootNew = xmlDocNew.getElementsByTagName("ZAS")[0];

		// Ensure XML structure for label setup information is complete.
		var labelSetupTemp = xmlDocNew.createElement("LABELSETUP");
		labelSetupTemp.setAttribute("PANELPOSITION","2"); 
		labelSetupTemp.setAttribute("INITIALVISIBILITY","1"); 
		labelSetupTemp.setAttribute("MINSCALE","1"); 
		labelSetupTemp.setAttribute("MAXSCALE","1"); 
		
		// Transfer data for LABELSETUP from prior XML where fields exist.
		var labelSetupPrior = xmlDocPrior.getElementsByTagName("LABELSETUP")[0];
		temp = labelSetupPrior.getAttribute("PANELPOSITION");
		if (Z.Utils.isStrVal(temp)) { labelSetupTemp.setAttribute("PANELPOSITION", temp); }
		temp = labelSetupPrior.getAttribute("INITIALVISIBILITY");
		if (Z.Utils.isStrVal(temp)) { labelSetupTemp.setAttribute("INITIALVISIBILITY", temp); }
		temp = labelSetupPrior.getAttribute("MINSCALE");
		if (Z.Utils.isStrVal(temp)) { 
			if (!isNaN(parseFloat(temp)) && parseFloat(temp) > 0) { 
				labelSetupTemp.setAttribute("MINSCALE", temp);
			}
		}
		temp = labelSetupPrior.getAttribute("MAXSCALE");
		if (Z.Utils.isStrVal(temp)) { 
			if (!isNaN(parseFloat(temp)) && parseFloat(temp) > 0) { 
				labelSetupTemp.setAttribute("MAXSCALE", temp);
			}
		}	
		
		// Insert SETUP node into new XML.
		xmlRootNew.appendChild(labelSetupTemp);

		// Process POIs - and within each, Notes and Labels.
		var poiNodesPrior = xmlDocPrior.getElementsByTagName("POI"); 		
		for (var i = 0, j = poiNodesPrior.length; i < j; i++) {
			var poiTemp = xmlDocNew.createElement("POI");
			
			// Ensure POI XML structure is complete.
			poiTemp.setAttribute("ID","0"); 
			poiTemp.setAttribute("NAME", Z.Utils.getResource("CONTENT_POINAME")); 
			poiTemp.setAttribute("X","center");  
			poiTemp.setAttribute("Y","center");  
			poiTemp.setAttribute("ZOOM","-1");  
			poiTemp.setAttribute("USER", Z.Utils.getResource("CONTENT_POIUSER"));  
			poiTemp.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());

			// Transfer data for POIs from prior XML where fields exist. This code segment will
			// be replaced when editing interface elements are added for POIs.
			var poiPrior = poiNodesPrior[i];

			temp = poiPrior.getAttribute("ID");
			if (Z.Utils.isStrVal(temp)) { poiTemp.setAttribute("ID", temp); }	
			temp = poiPrior.getAttribute("NAME");
			if (Z.Utils.isStrVal(temp)) { poiTemp.setAttribute("NAME", temp); }	
			temp = poiPrior.getAttribute("X");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiTemp.setAttribute("X", ((temp == "center") ? imageCenterX.toString() : temp)); 
			}
			temp = poiPrior.getAttribute("Y");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiTemp.setAttribute("Y", ((temp == "center") ? imageCenterY.toString() : temp)); 
			}
			temp = poiPrior.getAttribute("ZOOM");
			if (Z.Utils.isStrVal(temp) && !isNaN(parseFloat(temp))) { 
				poiTemp.setAttribute("ZOOM", temp); 
			}
			temp = poiPrior.getAttribute("USER");
			if (Z.Utils.isStrVal(temp)) { poiTemp.setAttribute("USER", temp); }
			temp = poiPrior.getAttribute("DATE");
			if (Z.Utils.isStrVal(temp)) { poiTemp.setAttribute("DATE", temp); }
			
			// Insert POI node into new XML.
			xmlRootNew.appendChild(poiTemp);
			
			// Process Notes of this POI.
			var poiNotesContainerPrior = poiNodesPrior[i].getElementsByTagName("NOTES")[0]; 
			if (typeof poiNotesContainerPrior !== "undefined") {
				var poiNotesContainerTemp = xmlDocNew.createElement("NOTES");			
				poiTemp.appendChild(poiNotesContainerTemp);
				
				var poiNotesPrior = poiNotesContainerPrior.getElementsByTagName("NOTE"); 
				for (var k = 0, m = poiNotesPrior.length; k < m; k++) {

					// Ensure NOTE XML structure is complete.
					var poiNoteTemp = xmlDocNew.createElement("NOTE");
					poiNoteTemp.setAttribute("ID","0"); 
					poiNoteTemp.setAttribute("NAME", Z.Utils.getResource("CONTENT_NOTENAME")); 
					poiNoteTemp.setAttribute("TEXT", Z.Utils.getResource("CONTENT_NOTETEXT"));   
					poiNoteTemp.setAttribute("USER", Z.Utils.getResource("CONTENT_NOTEUSER"));  
					poiNoteTemp.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());
					
					// Transfer data for NOTE from prior XML where fields exist. This code segment will
					// be replaced when editing interface elements are added for POIs.
					var notePrior = poiNotesPrior[k];	

					temp = notePrior.getAttribute("ID");
					if (Z.Utils.isStrVal(temp)) { poiNoteTemp.setAttribute("ID", temp); }	
					temp = notePrior.getAttribute("NAME");
					if (Z.Utils.isStrVal(temp)) { poiNoteTemp.setAttribute("NAME", temp); }	
					temp = notePrior.getAttribute("TEXT");
					if (Z.Utils.isStrVal(temp)) { poiNoteTemp.setAttribute("TEXT", temp); }	
					temp = notePrior.getAttribute("USER");
					if (Z.Utils.isStrVal(temp)) { poiNoteTemp.setAttribute("USER", temp); }	
					temp = notePrior.getAttribute("DATE");
					if (Z.Utils.isStrVal(temp)) { poiNoteTemp.setAttribute("DATE", temp); }
					
					// Insert Note node into new XML.
					poiNotesContainerTemp.appendChild(poiNoteTemp);

				}
			}	
			
			// Process Labels of this POI.	
			if (hotspots.length > 0) {
				var poiLabelsContainerTemp = xmlDocNew.createElement("LABELS");	
				poiTemp.appendChild(poiLabelsContainerTemp);

				// Transfer data for each LABEL of each POI from editing interface objects.
				for (var n = 0, o = hotspots.length; n < o; n++) {
					var poiLabelTemp = xmlDocNew.createElement("LABEL");
					poiLabelTemp.setAttribute("ID", hotspots[n].id); 
					poiLabelTemp.setAttribute("NAME", hotspots[n].name); 
					poiLabelTemp.setAttribute("MEDIATYPE", hotspots[n].mediaType);  
					poiLabelTemp.setAttribute("MEDIA", hotspots[n].media);  
					poiLabelTemp.setAttribute("X", hotspots[n].x);  
					poiLabelTemp.setAttribute("Y", hotspots[n].y);  
					poiLabelTemp.setAttribute("ZOOM", hotspots[n].zoom); 
					poiLabelTemp.setAttribute("XSCALE", hotspots[n].xScale); 
					poiLabelTemp.setAttribute("YSCALE", hotspots[n].yScale); 
					poiLabelTemp.setAttribute("URL", hotspots[n].url); 
					poiLabelTemp.setAttribute("URLTARGET", hotspots[n].urlTarget); 
					poiLabelTemp.setAttribute("ROLLOVER", hotspots[n].rollover); 
					poiLabelTemp.setAttribute("CAPTION", hotspots[n].caption); 
					poiLabelTemp.setAttribute("TOOLTIP", hotspots[n].tooltip); 
					poiLabelTemp.setAttribute("CAPTIONPOSITION", hotspots[n].captionPosition); 					
					poiLabelTemp.setAttribute("USER", Z.Utils.getResource("CONTENT_LABELUSER"));  
					poiLabelTemp.setAttribute("DATE", Z.Utils.getCurrentUTCDateAsString());
					
					var polyPts = hotspots[n].polygonPts;
					if (polyPts != null) {
						var poiPolyTemp = xmlDocNew.createElement("POLYGON");
						for (var p = 0, q = polyPts.length; p < q; p++) {
							var poiPointTemp = xmlDocNew.createElement("POINT");
							poiPointTemp.setAttribute("X", polyPts[p].x); 
							poiPointTemp.setAttribute("Y", polyPts[p].y); 
							poiPolyTemp.appendChild(poiPointTemp);
						}
						poiLabelTemp.appendChild(poiPolyTemp);
					}
					
					poiLabelsContainerTemp.appendChild(poiLabelTemp);
				}	
			}
		}
		
		// Debug options: 
		//console.log("xmlDocPrior: " + Z.Utils.convertXMLDocToXMLText(xmlDocPrior));
		//console.log("xmlDocNew: " + Z.Utils.convertXMLDocToXMLText(xmlDocNew));
		
		return xmlDocNew;
	};
	
	this.setAllHotspotsSaved = function () {
		for (var i = 0, j = hotspots.length; i < j; i++) {
			hotspots[i].saved == true;
		}	
	};		
	
	
	
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::: INTERACTION FUNCTIONS :::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	this.setView =  function (x, y, z) {
		if (x == undefined || x == null) { x = (Z.imageW / 2); }
		if (y == undefined || y == null) { y = (Z.imageH / 2); }
		if (z == undefined || z == null) { 
			z = Z.fitZ; 
		} else if (z > 1) {
			z = z / 100;
		}
		view(x, y, z);
	};

	function view (x, y, z) {
		// View assignment function.
		self.zoomAndPanAllStop();
		Z.imageZ = constrainZoom(z);
		var constrainedPt = constrainPanByImageCoordinates(x, y, z);
		Z.imageX = constrainedPt.x;
		Z.imageY = constrainedPt.y;
		self.updateView(true);
	};

	this.zoom =  function (zoomDir) {
		switch(zoomDir) {
			case "out" :
				if (zoom >= 0) { zoom -= zoomStepDistance; }
				break;
			case "in" :
				if (zoom <= 0) { zoom += zoomStepDistance; }
				break;
			case "stop" :
				zoom = 0;
				break;
		}
		Z.zooming = (zoom == 0) ? "stop" : ((zoom > 0) ? "in" : "out");
		
		if (zoom !=0) {
			if (!zapTimer) {
				if (((zoom < 0) && (Z.imageZ > Z.minZ)) || ((zoom > 0) && (Z.imageZ < Z.maxZ))) {
					self.toggleWatermarks(false); 
				}
				if (!Z.useCanvas) { clearDisplay(wD); }
				zapTimer = window.setTimeout(zoomAndPanContinuousStep, zapStepDuration);
			}
		} else {
			zoomAndPanContinuousStop();
			self.updateView();
			self.toggleWatermarks(true);
		}
	};

	this.pan =  function (panDir) {
		// Pan direction refers to the pan of the view - the opposite of the movement of the image.
		switch(panDir) {
			case "left" :
				if (panX <= 0) { panX += panStepDistance; }
				break;
			case "up" :
				if (panY <= 0) { panY += panStepDistance; }
				break;
			case "down" :
				if (panY >= 0) { panY -= panStepDistance; }
				break;
			case "right" :
				if (panX >= 0) { panX -= panStepDistance; }
				break;
			case "horizontalStop" :
				panX = 0;
				break;
			case "verticalStop" :
				panY = 0;
				break;
			case "stop" :
				panX = 0;
				panY = 0;
				break;
		}
		Z.panningX = (panX == 0) ? "stop" : ((panX > 0) ? "left" : "right");
		Z.panningY = (panY == 0) ? "stop" : ((panY > 0) ? "up" : "down");
		zapTierCurrentZoomUnscaledX = Z.imageX * convertTierScaleToZoom(tierCurrent, 1);
		zapTierCurrentZoomUnscaledY = Z.imageY * convertTierScaleToZoom(tierCurrent, 1);
		
		if (panX !=0 || panY != 0) {
			if (!zapTimer) {
				// Clear watermarks for faster, smoother zoom.
				self.toggleWatermarks(false); 
				if (!Z.useCanvas) { clearDisplay(wD); }
				zapTimer = window.setTimeout(zoomAndPanContinuousStep, zapStepDuration);
			}
		} else {
			zoomAndPanContinuousStop();
			self.updateView();
			self.toggleWatermarks(true);
		}
	};

	function zoomAndPanContinuousStep () {
		if (zapTimer) {
			// If interval, pan, zoom values not cleared, pan and/or zoom one step.
			if (panX != 0 || panY != 0 || zoom != 0) {
				zoomAndPan(panX, panY, zoom);
				// If pan and zoom variables have not been cleared, recall timer.				
				zapTimer = window.setTimeout(zoomAndPanContinuousStep, zapStepDuration);
			}
		}
	};
	
	function zoomAndPan (stepX, stepY, stepZ) {
		// Pan constraint is applied separately to direct pan and to the indirect pan that
		// occurs when zooming out if image off-center. This enables prevention rather
		// than correction of dissallowed pan and avoids jitter at boundary conditions.
		var viewPanned = false;
		var syncSlider = false;
		var syncNav = false;
		
		if (stepZ != 0) {
			// Calculate change to scale of tier.  For zoom buttons and keys, meter progress by
			// increasing weight of each step as tier scale grows and decreasing as scale shrinks.
			var targetScale = tierScale *  (1 + stepZ);
			
			// Calculate target zoom for current step based on target scale for current step.
			var targetZoom = convertTierScaleToZoom(tierCurrent, targetScale);
			
			// Constrain target zoom.
			constrainedZoom = constrainZoom(targetZoom);
			if (constrainedZoom != Z.imageZ) {
			
				// Scale the viewport display to implement zoom step.
				var syncSlider = syncNav = scaleTierToZoom(constrainedZoom);
			}
		} 
		
		if (stepX != 0 || stepY != 0) {				
			// Calculate new container position.
			var targetL = parseFloat(cS.left) + stepX;
			var targetT = parseFloat(cS.top) + stepY;
			
			// Calculate constrained new position.
			var constrainedPosition = constrainPanByViewportContainerCoordinates(targetL, targetT);
						
			// Set viewport display to new position.
			cS.left = constrainedPosition.x + "px";
			cS.top = constrainedPosition.y + "px";
						
			viewPanned = true;
			syncNav = true;
		}

		// Sync toolbar slider, and navigator every other step if visible and update required.
		if (zapStepCount % 2 == 0) {
			redisplayWatermarks();
			redisplayHotspots();
			if (syncSlider) { syncToolbarSlider(); }
			if (syncNav)  { syncNavigator(); }
		}

		// Load new tiles as needed during panning (not zooming).
		/* DEV NOTE: Updating tiles while panning disabled. Requires optimization.
		if (viewPanned) {
			var canvasScale = (Z.useCanvas) ? (parseFloat(vS.width) / vD.width) : 1;
			var loadThreshold = Math.round(TILE_SIZE / panStepDistance * tierScale * canvasScale);
			var loadStep = (zapStepCount % loadThreshold == 0 && zapStepCount != 0);
			if (loadStep) { updateViewWhilePanning(stepX, stepY); }
		}*/
	};

	this.zoomAndPanToView = function (targetX, targetY, targetZ, duration, steps) {	
		// Transition smoothly to new view. Image coordinates input, converted to viewport coordinates,
		// then zoom and pan, then updateView to convert changes back to image coordinates.

		//First stop any zoom or pan in progress.
		self.zoomAndPanAllStop();

		// Optional parameters override defaults, if present.
		if (typeof duration === "undefined" || duration === null) { duration = zaptvDuration; }
		if (typeof steps === "undefined" || steps === null) { steps = zaptvSteps; }
		
		// Next, clear watermarks for fast, smooth zoom.
		self.toggleWatermarks(false);
		if (!Z.useCanvas) { clearDisplay(wD); }

		// If X or Y values are null, assign initial value (typically center point).
		if (targetX == null) { targetX = Z.initialX; }
		if (targetY == null) { targetY = Z.initialY; }
		
		// Validate zoom value and convert to 0.01 to 1 range if in 1 to 100 range.
		if (targetZ == null) {
			targetZ = Z.initialZ; 
		} else if (targetZ > 1 && targetZ < 2 && targetZ % 1 != 0) {
			targetZ = 1;
		} else if (targetZ > 1) {
			targetZ /= 100; 
		} else if (targetZ > 0.99 && targetZ < 1 && ((targetZ * 100) % 1) != 0) {
			targetZ = 1;
		}
		
		// Constrain target coordinates.
		var constrainedTargetPoint = constrainPanByImageCoordinates(targetX, targetY, targetZ);
		targetX = constrainedTargetPoint.x;
		targetY = constrainedTargetPoint.y;
		targetZ = constrainZoom(targetZ);
		
		// Set step counter.
		zaptvStepCurrent = 0;

		// Debug option: Add horizontal and vertical lines to verify end point accuracy.
		//Z.Utils.drawCenterLines(Z.ViewerDisplay, viewW, viewH);

		// Begin steps toward target coordinates.
		zoomAndPanToViewStep(targetX, targetY, targetZ, duration, steps);
	};
		
	function zoomAndPanToViewStep (tX, tY, tZ, duration, steps) {
	
		// Increment step counter and calculate time values.
		zaptvStepCurrent++;
		var stepDuration = duration / steps;
		var currentStepTime = zaptvStepCurrent * stepDuration;
	
		// Calculate eased step values.
		var newX = Z.Utils.easing(Z.imageX, tX, currentStepTime, duration);
		var newY = Z.Utils.easing(Z.imageY, tY, currentStepTime, duration);
		var newZ = Z.Utils.easing(Z.imageZ, tZ, currentStepTime, duration);
		
		// DEV NOTE: Additional option: adjust pan for zoom. When zooming in, all points move
		// away from center which magnifies pan toward points to right and/or below center and
		// minifies pan toward points to left and above center. Zooming out creates opposite
		// effect. Current implementation mitigates this impact partially and adequately.
		
		// Convert step image pixel values to viewport values.
		var newPt = convertImageCoordsToViewportCoords(newX, newY, newZ);
		var newL = newPt.x;
		var newT = newPt.y;
		
		// Determine if related components need sync'ing.
		if (newL != parseFloat(cS.left) || newT != parseFloat(cS.top)) { syncNav = true; }
		var syncSlider = syncNav = scaleTierToZoom(newZ);

		// Set new display CSS position and scale.
		cS.left = newL + "px";
		cS.top = newT + "px";

		// Sync watermarks and hotspots ever step if visible to ensure smoothly sync'd scaling.
		//redisplayWatermarks(); // Default implementation hides watermarks during zooming.
		redisplayHotspots();
		
		// Sync toolbar slider, and navigator every other step if visible and update required.
		if (zaptvStepCurrent % 2 == 0) {
			if (syncSlider) { syncToolbarSlider(); }
			if (syncNav)  { syncNavigator(); }
		}
		
		// Take additional step toward target or finalize view, depending on step counter.
		if (zaptvStepCurrent < steps+1) {
			zaptvTimer = window.setTimeout( function() { zoomAndPanToViewStep(tX, tY, tZ, duration, steps); }, stepDuration);
		} else {
			// Update view and reset watermarks to visible if present.
			zoomAndPanToViewStop();
			self.updateView();
			self.toggleWatermarks(true);
		}		
	};

	this.zoomAndPanAllStop =  function (override) {
		zoomAndPanContinuousStop();
		zoomAndPanToViewStop();
		if (!override) { self.updateView(); }
	};

	function zoomAndPanContinuousStop () {
		if (zapTimer) {
			window.clearTimeout(zapTimer);
			zapTimer = null;
		}
		panX = 0;
		panY = 0;
		zoom = 0;
		zapStepCount = 0;
	};

	function zoomAndPanToViewStop () {
		// Call when completing zoomAndPanToView steps, when interrupting them, and when
		// beginning user interaction that would conflict with continued zoom and pan steps.
		if (zaptvTimer) {
			window.clearTimeout(zaptvTimer);
			zaptvTimer = null;
		}
	};

	this.scaleTierToZoom = function (imageZoom) {
		var sync = scaleTierToZoom(imageZoom);
		if (sync) {
			// Sync related displays and components.
			redisplayWatermarks();			
			redisplayHotspots();
			syncNavigator();
		}
	};

	function scaleTierToZoom (imageZoom) {
		// Main function implementing zoom through current tier scaling.  Used by zoomAndPan
		// function of zoom buttons and keys, sliderSlide and sliderSnap functions of slider, and
		// zoomAndPanToView function of Reset key and mouse-click and alt-click zoom features.
		// Note that it uses CSS scaling in canvas contexts and image element scaling otherwise.

		// Track whether function has scaled values so other components will be updated.
		var sync = false;

		// Calculate target tier scale from zoom input value.
		var targetTierScale = convertZoomToTierScale(tierCurrent, imageZoom);
	
		// If input zoom requires a change in scale, continue.
		if (targetTierScale != tierScale) {
			
			// Update tracking variables.
			tierScale = targetTierScale;
			tierBackfillScale = convertZoomToTierScale(tierBackfill, imageZoom);
			
			// Calculate scale adjusting for current scale previously applied to canvas or tiles.		
			var newScale = targetTierScale / tierScalePrior;
			// Calculate new size and position - X and Y from panning are applied when 
			// drawing tiles or, for backfill, below.
			var newW = displayW * newScale;
			var newH = displayH * newScale;
			var newL = (displayW - newW) / 2;
			var newT = (displayH - newH) / 2;

			// Constrain pan during zoom-out. 
			if (targetTierScale < tierScalePrior) {
				var constrainedPt = constrainPanByViewportDisplayCoordinates(newL, newT);
				cS.left = (displayL + constrainedPt.x - newL) + "px";
				cS.top = (displayT + constrainedPt.y - newT) + "px";
			}

			// Apply new scale to displays.
			if (Z.useCanvas) {				
				// Redraw viewport display using CSS scaling.
				vS.width = newW + "px";
				vS.height = newH + "px";
				vS.left = newL + "px";
				vS.top = newT + "px";
				
				// Sync drawing display.
				if (dD) {
					dS.width = newW + "px";
					dS.height = newH + "px";
					dS.left = newL + "px";
					dS.top = newT + "px";
				}				
				
				// Sync drawing display.
				if (eD) {
					eS.width = newW + "px";
					eS.height = newH + "px";
					eS.left = newL + "px";
					eS.top = newT + "px";
				}
				
				// Sync backfill display. Different size and position because backfill
				// is sized to content not viewport, to support Navigator panning.
				newW = backfillW * newScale;
				newH = backfillH * newScale;
				newL = backfillL + ((Z.imageX  * (1 - newScale)) * Z.imageZ);
				newT = backfillT + ((Z.imageY * (1 - newScale)) * Z.imageZ);
				
				bS.width = newW + "px";
				bS.height = newH + "px";
				bS.left = newL + "px";
				bS.top = newT + "px";
			} else {				
				// In non-canvas context, scaling of each tile image is required.
				redisplayCachedTiles(vD, tierCurrent, tilesLoaded, "centerOut", false, "Scaling: non-canvas zoom");
				
				// Repositioning of backfill display is required due to sizing by tier and positioning by image X and Y values.
				tierBackfillW = tierWs[tierBackfill];
				tierBackfillH = tierHs[tierBackfill];
				bD.width = tierBackfillW;
				bD.height = tierBackfillH;
				var backfillScaledW = tierBackfillW * tierBackfillScale;
				var backfillScaledH = tierBackfillH * tierBackfillScale;
				var deltaX = Z.imageX * imageZoom;
				var deltaY = Z.imageY * imageZoom;
				backfillL = (displayCtrX - deltaX);
				backfillT = (displayCtrY - deltaY);
				bS.left = backfillL + "px";
				bS.top = backfillT + "px";
				
				// And scaling of each tile is also required for backfill display.
				redisplayCachedTiles(bD, tierBackfill, tilesBackfillLoaded, "simple", false, "Scaling: non-canvas zoom - backfill");
			}			
			sync = true;
		}
		return sync;
	};

	this.reset =  function () {
		self.zoomAndPanToView(Z.initialX, Z.initialY, Z.initialZ);
	};

	this.toggleFullPageViewExternal = function () {
		// Assumes call from external toolbar and internal toolbar hidden. Sets flag to cause display
		// Cancel button over viewport in full page mode when external toolbar is hidden under viewport.
		buttonFPCancelVisible = true;
		self.toggleFullPageView();
	};

	this.toggleFullPageView =  function (override) {
		self.zoomAndPanAllStop();

		// If override is false (called by Escape key) set false, otherwise, set to opposite of current state.
		Z.fullPage = (override) ? override : !Z.fullPage;

		// Declare and set document references.
		var fpB = document.body;
		var fpbS = fpB.style;
		var fpdS = document.documentElement.style;
		var fpcS = Z.ViewerDisplay.style;

		var width = null;
		var height = null;

		// Update page display values.
		if (Z.fullPage) {
			// Record non-full-page values.
			fpBodW = fpbS.width;
			fpBodH = fpbS.height;
			fpBodO = fpbS.overflow;
			fpDocO = fpdS.overflow;
			fpContBC = (Z.Utils.isStrVal(fpcS.backgroundColor) && fpcS.backgroundColor != "transparent") ? fpcS.backgroundColor : (Z.Utils.isStrVal(fpbS.backgroundColor) && fpbS.backgroundColor != "transparent") ? fpbS.backgroundColor : Z.Utils.getResource("DEFAULT_FULLPAGEBACKCOLOR");
			fpContPos = fpcS.position;
			fpContIdx = fpcS.zIndex;

			// Apply full page values.
			var winDimensions;
			if (!Z.mobileDevice) {
				fpbS.width = "100%";
				fpbS.height = "100%";
			} else { 
				winDimensions = Z.Utils.getWindowSize();
				fpbS.width = winDimensions.x;
				fpbS.height = winDimensions.y;
			}
			fpbS.overflow = "hidden";
			fpdS.overflow = "hidden";
			fpcS.backgroundColor = fpContBC;
			fpcS.position = "fixed";
			fpcS.zIndex = "99999999";

			winDimensions = Z.Utils.getWindowSize();
			width = winDimensions.x;
			height = winDimensions.y;
		} else {
			// Reset recorded non-full-page values.
			fpbS.width = fpBodW;
			fpbS.height = fpBodH;
			fpbS.overflow = fpBodO;
			fpdS.overflow = fpDocO;
			fpcS.backgroundColor = fpContBC;
			fpcS.position = "relative";
			fpcS.zIndex = fpContIdx;

			var containerS = Z.Utils.getElementStyle(Z.pageContainer);
			width = parseFloat(containerS.width);
			height = parseFloat(containerS.height);
			if (isNaN(width)) { width = Z.ViewerDisplay.clientWidth; }
			if (isNaN(height)) { height = Z.ViewerDisplay.clientHeight; }
			
			buttonFPCancelVisible = false;
		}
		
		// Update global viewer size values.
		Z.viewerW = width;
		Z.viewerH = height;
		
		// Update viewport size and position values.
		sizeAndPosition(width, height);
		
		// If using external toolbar in page, display cancel button over viewport.		
		showButtonFPCancel(buttonFPCancelVisible);
		
		// Update component size and position values.
		if (Z.ToolbarDisplay && Z.Toolbar.getInitialized()) { 
			Z.toolbarCurrentW = (Z.toolbarW == -1) ? width : Z.toolbarW;
			var toolbarTop = (Z.toolbarPosition == 1) ? Z.viewerH - Z.toolbarH : 0;
			Z.Toolbar.setSizeAndPosition(Z.toolbarCurrentW, null, null, toolbarTop); 
		}
		if (Z.NavigatorDisplay && Z.Navigator.getInitialized()) { Z.Navigator.setSizeAndPosition(Z.navigatorW, Z.navigatorH, Z.navigatorL-1, Z.navigatorT-1); }

		// Update viewer min and max defaults for resized viewport. Note that zoom-to-fit will be
		// applied if required when changing to full page mode, but not when returning from it.
		validateXYZDefaults();

		// Apply constraints to new view if not disabled by optional parameters.
		Z.imageZ = constrainZoom(Z.imageZ);
		var x = parseFloat(cS.left);
		var y = parseFloat(cS.top);
		var constrainedPt = constrainPanByViewportContainerCoordinates(x, y);
		cS.left = constrainedPt.x + "px";
		cS.top = constrainedPt.y + "px";

		self.updateView(true);
	};
	
	function showButtonFPCancel (value) {
		if (value) {
			if (!buttonFPCancel) { configureButtonFPCancel(); }
			buttonFPCancel.elmt.style.display = "inline-block";
		} else {
			if (buttonFPCancel) { buttonFPCancel.elmt.style.display = "none"; }
		}
	};
	
	function configureButtonFPCancel () {
		var btnTxt = Z.Utils.getResource("DEFAULT_FPCANCELBUTTONTEXT");
		var btnW = 34;
		var btnH = 34;
		var btnMargin = 20;
		var btnL = parseFloat(Z.viewerW) - (btnW + btnMargin);
		var btnT = parseFloat(Z.viewerH) - (btnH + btnMargin);
		var btnColor = Z.Utils.getResource("DEFAULT_FPCANCELBUTTONCOLOR");
		buttonFPCancel = new Z.Utils.Button("buttonFPCancel", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", buttonFPCancelHandler, "TIP_CANCELFULLPAGE", "solid", "1px", btnColor, "0px", "0px");
		Z.ViewerDisplay.appendChild(buttonFPCancel.elmt);	
	};
	
	function buttonFPCancelHandler () {
		self.toggleFullPageView(false);
	};
	
	this.toggleBackfill = function () {
		var bS = Z.ViewerDisplay.firstChild.childNodes[0].style;
		bS.display = (bS.display == "none") ? "inline-block" : "none";
	};

	this.toggleDisplay = function () {
		var vS = Z.ViewerDisplay.firstChild.childNodes[1].style;
		vS.display = (vS.display == "none") ? "inline-block" : "none";
	};
	
	this.toggleWatermarks = function (override) {
		if (wS) {
			var setMarksVisible = (override) ? override : !(wS.display == "inline-block");
			wS.display = (setMarksVisible) ? "inline-block" : "none";
		}
	};

	this.toggleConstrainPan = function () {
		Z.constrainPan = !Z.constrainPan;
		if (Z.constrainPan) {
			var x = parseFloat(vS.left);
			var y = parseFloat(vS.top);
			var constrainedPt = constrainPanByViewportContainerCoordinates(x, y);
			cS.left = constrainedPt.x + "px";
			cS.top = constrainedPt.y + "px";
			self.updateView();
		}
	};

	this.getClickZoomCoords3D = function (evnt, drgPtEnd, tCurrent, tScale) {
		// Set condition for zooming in or out by more than one tier.
		var tierSkipThreshold = parseFloat(Z.Utils.getResource("DEFAULT_CLICKZOOMTIERSKIPTHRESHOLD"));

		// Calculate image coordinates of click and set default target zoom.
		var viewportClickPt = convertPageCoordsToViewportCoords(drgPtEnd.x, drgPtEnd.y);
		var imageClickPt = convertViewportCoordsToImageCoords(viewportClickPt.x, viewportClickPt.y);
		var targetZ = convertTierScaleToZoom(tCurrent, tScale);

 		// Calculate target zoom for next or prior tier. If very close to next tier, skip over it.
		if (!evnt.altKey) {  // Zooming in.
			if (tScale < 1 - tierSkipThreshold) {
				targetZ = convertTierScaleToZoom(tCurrent, 1);
			} else if (tCurrent < tierCount - 1) {
				targetZ = convertTierScaleToZoom(tCurrent + 1, 1);
			}
		} else {  // Zooming out.
			if (tScale > 1 + tierSkipThreshold) {
				targetZ = convertTierScaleToZoom(tCurrent, 1);
			} else if (tCurrent > 0) {
				targetZ = convertTierScaleToZoom(tCurrent - 1, 1);
			}
			// If nearly to zoom-to-fit, set to zoom-to-fit.
			if ((targetZ - Z.fitZ) <  tierSkipThreshold) { targetZ = Z.fitZ; }
		}

		return new Z.Utils.Point3D(imageClickPt.x, imageClickPt.y, targetZ);
	};

	this.syncToNavigator = function (currentX, currentY) {
		// Sync viewport display to navigator rectangle.
		var deltaScaledX = -(currentX - Z.imageX);
		var deltaScaledY = -(currentY - Z.imageY);
		var deltaX = deltaScaledX * Z.imageZ;
		var deltaY = deltaScaledY * Z.imageZ;
		var newX = deltaX + displayL;
		var newY = deltaY + displayT;
		var constrainedPt = constrainPanByViewportContainerCoordinates(newX, newY)
		cS.left = constrainedPt.x + "px";
		cS.top = constrainedPt.y + "px";
	};

	this.calculateCurrentCenterCoordinates = function (viewportPt) {
		if (!viewportPt) { var viewportPt = new Z.Utils.Point(parseFloat(cS.left), parseFloat(cS.top)); } 
		var deltaX = viewportPt.x - displayL;
		var deltaY = viewportPt.y - displayT;
		var deltaScaledX = deltaX / Z.imageZ;
		var deltaScaledY = deltaY / Z.imageZ;
		var currentX = Z.imageX - deltaScaledX;
		var currentY = Z.imageY - deltaScaledY;		
		return new Z.Utils.Point(currentX, currentY);
	};


	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::::: EVENT FUNCTIONS ::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	function initializeViewportEventListeners() {
		// Handle viewport mouse and keyboards events.
		Z.Utils.addEventListener(document, "keydown", keyDownHandler);
		Z.Utils.addEventListener(document, "keyup", keyUpHandler);
		if (!Z.mobileDevice) {
			// Event handlers for browser contexts with mouse support.
			Z.Utils.addEventListener(Z.ViewerDisplay, "mouseover", viewerDisplayMouseOverHandler);
			Z.Utils.addEventListener(Z.ViewerDisplay, "mouseout", viewerDisplayMouseOutHandler);
			Z.Utils.addEventListener(Z.ViewerDisplay, "mousemove", Z.Utils.preventDefault);
			Z.Utils.addEventListener(cD, "mousedown", viewportDisplayMouseDownHandler);
			Z.Utils.addEventListener(cD, "mousemove", Z.Utils.preventDefault);
		} else {
			// Event handlers for mobile devices.
			Z.Utils.addEventListener(cD, "touchstart", viewerDisplayTouchStartHandler);
			Z.Utils.addEventListener(cD, "touchmove", viewerDisplayTouchMoveHandler);
			Z.Utils.addEventListener(cD, "touchend", viewerDisplayTouchEndHandler);
			Z.Utils.addEventListener(cD, "touchcancel", viewerDisplayTouchCancelHandler);
			Z.Utils.addEventListener(cD, "gesturestart", viewerDisplayGestureStartHandler);
			Z.Utils.addEventListener(cD, "gesturechange", viewerDisplayGestureChangeHandler);
			Z.Utils.addEventListener(cD, "gestureend", viewerDisplayGestureEndHandler);
			
			// The following handler assignment approach is necessary for iOS to properly respond.
			document.getElementsByTagName("body")[0].onorientationchange = orientationChangeHandler;
			//Z.Utils.addEventListener(document, "onresize", orientationChangeHandler);
		}		
		
		// Disable right-click / control-click / click-hold menu.
		Z.Utils.addEventListener(bD, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.addEventListener(vD, "contextmenu", Z.Utils.preventDefault);
		if (wD) { Z.Utils.addEventListener(wD, "contextmenu", Z.Utils.preventDefault); }
		if (hD) { Z.Utils.addEventListener(hD, "contextmenu", Z.Utils.preventDefault); }
	};

	function viewerDisplayMouseOverHandler (event) {
		// Block if moving within viewer display or subelements.
		var targetIsInViewer = Z.Utils.nodeIsInViewer(Z.Utils.target(Z.Utils.event(event)));
		var relatedTargetIsInViewer = Z.Utils.nodeIsInViewer(Z.Utils.relatedTarget(event));
		if (!(targetIsInViewer && relatedTargetIsInViewer)) {
			// Mouse-over bubbles from navigator or toolbar blocked by stop propagation handlers. Mouse-overs not
			// needed on return from outside viewer as components would be hidden if toolbar mode enables hiding.
			if (Z.ToolbarDisplay && (Z.toolbarVisible > 1)) { Z.Toolbar.show(true); }
			if (Z.NavigatorDisplay && Z.navigatorVisible > 1) { Z.Navigator.setVisibility(true); }
			mouseOutDownPoint = null;
		}
	};

	function viewportDisplayMouseDownHandler (event) {
		// DEV NOTE: Timeout in next line is placeholder workaround for hotspot icon and caption anchor failure in IE.
		var viewerDisplayMouseDownTimer = window.setTimeout( function() { self.zoomAndPanAllStop(); }, 1);
		
		if (Z.Utils.isRightMouseButton(event)) { return; } // Prevent zoom on right-click.
		
		mouseIsDown = true;
		var mPt = Z.Utils.getMousePosition(event);
		dragPtStart = new Z.Utils.Point(mPt.x, mPt.y);
		cD.mouseXPrior = mPt.x;
		cD.mouseYPrior = mPt.y;	
		
		// If editing polygon of current hotspot check if clicked control point.
		if (Z.polygonEditing && hotspotCurrentID !== null) { 
			var clickZoomPt = self.getClickZoomCoords3D(event, dragPtStart, tierCurrent, tierScale);
			controlPointCurrent = getClickedControlPoint(event, clickZoomPt); 
		}
		Z.Utils.addEventListener(document, "mousemove", viewerDisplayMouseMoveHandler);
		Z.Utils.addEventListener(cD, "mouseup", viewerDisplayMouseUpHandler);
		Z.Utils.addEventListener(document, "mouseup", viewerDisplayMouseUpHandler);
		
		return false;
	};

	function viewerDisplayMouseMoveHandler (event) {
		var event = Z.Utils.event(event);
		var mPt = Z.Utils.getMousePosition(event);
		dragPtCurrent = new Z.Utils.Point(mPt.x, mPt.y);
		var clickZoomPt = self.getClickZoomCoords3D(event, dragPtCurrent, tierCurrent, tierScale);
		
		// If clicked on control point drag it. If clicked off all control points and mouse is not
		// down, draw line to current point. Otherwise, mouse-pan image.
		if (Z.polygonEditing && controlPointCurrent !== null && mouseIsDown) {
			updateControlPoints(hotspotCurrentID, controlPointCurrent, clickZoomPt);
		} else if (Z.polygonEditing && !polygonClosed && (!mouseIsDown || (mouseIsDown && controlPointCurrent !== null))) {
			var mPtX = (clickZoomPt.x - Z.imageX) * Z.imageZ;
			var mPtY = (clickZoomPt.y - Z.imageY) * Z.imageZ;
			drawPolygonBungeeLine(mPtX, mPtY);
		} else {
			if (!Z.mousePan) { return; }  // Disallow mouse panning if parameter false.

			// Calculate change in mouse position.
			var xPos = mPt.x - cD.mouseXPrior;
			var yPos = mPt.y - cD.mouseYPrior;

			if (!isNaN(xPos) && !isNaN(yPos)) {
				// Calculate new position of displays container.
				var newL = parseFloat(cS.left) + xPos;
				var newT = parseFloat(cS.top) + yPos;

				// Constrain new position.
				var constrainedPt = constrainPanByViewportContainerCoordinates(newL, newT);
				cS.left = constrainedPt.x + "px";
				cS.top = constrainedPt.y + "px";

				// Update stored page coordinates for next call to this function.
				cD.mouseXPrior = mPt.x;
				cD.mouseYPrior = mPt.y;

				if (Z.Navigator) {
					// Sync navigator rectangle if visible.
					var currentCenterPt = self.calculateCurrentCenterCoordinates(constrainedPt);
					Z.Navigator.syncNavigatorRectanglePosition(currentCenterPt);
				}
			}
		}				
		return false;
	};

	function viewerDisplayMouseUpHandler (event) {
		mouseIsDown = false;
		document.mousemove = null;
		document.mouseup = null;
		
		Z.Utils.removeEventListener(document, "mousemove", viewerDisplayMouseMoveHandler);
		Z.Utils.removeEventListener(cD, "mouseup", viewerDisplayMouseUpHandler);
		Z.Utils.removeEventListener(document, "mouseup", viewerDisplayMouseUpHandler);

		var event = Z.Utils.event(event);
		var mPt = Z.Utils.getMousePosition(event);
		var dragPtEnd;
		if (!mouseOutDownPoint) {
			dragPtEnd = new Z.Utils.Point(mPt.x, mPt.y);
		} else {
			dragPtEnd = mouseOutDownPoint;
		}

		var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
		if (dragDist < 4) {
			var clickZoomPt = self.getClickZoomCoords3D(event, dragPtEnd, tierCurrent, tierScale);
			if (Z.clickZoom && !Z.polygonEditing) {
				// Debugging option: view(clickZoomPt.x, clickZoomPt.y, clickZoomPt.z);
				// DEV NOTE: Timeout in next line is placeholder workaround for caption anchor failure in Firefox.
				var viewerDisplayMouseUpClickZoomTimer = window.setTimeout( function() { self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, clickZoomPt.z); }, 1);
			} else if (Z.clickPan && !Z.polygonEditing) {
				self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, Z.imageZ);
			} else if (Z.polygonEditing) {
				// If in edit mode, handle click on or off control point with current polygon or not. 
				polygonClickHandler(event, clickZoomPt);
				
				// If drawing new polygon reset mouse move event handler to support bungee line drawing.
				if (!polygonClosed) { Z.Utils.addEventListener(document, "mousemove", viewerDisplayMouseMoveHandler); }
			}
		} else {
			if (Z.polygonEditing && (controlPointDragging || (controlPointCurrent === null && !polygonClosed))) {
				controlPointCurrent = null;
				controlPointDragging = false;
				var hC = new HotspotContext();
				var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
				if (hotspotCurrentIndex != -1) { 
					var polyCenter = Z.Utils.getCenterOfPolygonPoints(hotspots[hotspotCurrentIndex].polygonPts);
					hotspots[hotspotCurrentIndex].x = polyCenter.x;
					hotspots[hotspotCurrentIndex].y = polyCenter.y;
					clearDisplay(eD);
					displayHotspot(hotspots[hotspotCurrentIndex], hC);
					if (!polygonClosed) { Z.Utils.addEventListener(document, "mousemove", viewerDisplayMouseMoveHandler); }
				}
			}
			dragPtCurrent = null;
			if (Z.mousePan) { self.updateView(); }
		}

		// If mouse-dragged out of viewer display rather than mousing out, hide components.
		if (mouseOutDownPoint) {
			if (Z.ToolbarDisplay && Z.toolbarVisible > 1) { Z.Toolbar.show(false); }
			if (Z.NavigatorDisplay && Z.navigatorVisible > 1) { Z.Navigator.setVisibility(false); }
		}
	};

	function viewerDisplayMouseOutHandler (event) {
		// Block if moving within viewer display or subelements.
		var targetIsInViewer = Z.Utils.nodeIsInViewer(Z.Utils.target(event));
		var relatedTargetIsInViewer = Z.Utils.nodeIsInViewer(Z.Utils.relatedTarget(Z.Utils.event(event)));
		if (!(targetIsInViewer && relatedTargetIsInViewer)) {
			if (!mouseIsDown) {
				if (Z.ToolbarDisplay && (Z.toolbarVisible > 1)) { Z.Toolbar.show(false); }
				if (Z.NavigatorDisplay && Z.navigatorVisible > 1) { Z.Navigator.setVisibility(false); }
			} else {
				var mPt = Z.Utils.getMousePosition(event);
				mouseOutDownPoint = new Z.Utils.Point(mPt.x, mPt.y);
			}
		}
	};

	function viewerDisplayTouchStartHandler (event) {
		self.zoomAndPanAllStop();
		var event = Z.Utils.event(event);
		var touch = Z.Utils.getFirstTouch(event);
		if (touch && !gestureInterval) {
			wasGesturing = false;
			var target = touch.target;
			var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
			dragPtStart = new Z.Utils.Point(mPt.x, mPt.y);
			cD.mouseXPrior = mPt.x;
			cD.mouseYPrior = mPt.y;
			
			// Track touch-drag for polygon editing.
			if (Z.polygonEditing) { 
				mouseIsDown = true;

				// If editing polygon of current hotspot check if clicked control point.
				if (hotspotCurrentID !== null) { 
					var clickZoomPt = self.getClickZoomCoords3D(event, dragPtStart, tierCurrent, tierScale);
					controlPointCurrent = getClickedControlPoint(event, clickZoomPt); 
				}
			}
		}		
	};

	function viewerDisplayTouchMoveHandler (event) {
		var event = Z.Utils.event(event);
		event.preventDefault(); // Prevent page dragging.
		
		// Note that touches are prevented when gesturing, as well as when in process of
		// ending gesture by lifting fingers - even when fingers are lifted separately.
		var touch = Z.Utils.getFirstTouch(event);		
		var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
		dragPtCurrent = new Z.Utils.Point(mPt.x, mPt.y);
		var clickZoomPt = self.getClickZoomCoords3D(event, dragPtCurrent, tierCurrent, tierScale);
		
		// If touched on control point drag it. If touched off any control point and touch is not
		// down, draw line to current point. Otherwise, touch-pan image.
		// NOTE: no bungee drawing between touches to create control points as no tracking
		// of finger when not touching - that is, only mouse down, move, and up, not 'over'.
		if (Z.polygonEditing && controlPointCurrent !== null && mouseIsDown) {
			updateControlPoints(hotspotCurrentID, controlPointCurrent, clickZoomPt);
		} else {
			if (!Z.mousePan) { return; }  // Disallow mouse panning if parameter false.
			
			if (touch && !gestureInterval && !wasGesturing) {
				// Calculate change in touch position.
				var target = touch.target;
				var xPos = mPt.x - cD.mouseXPrior;
				var yPos = mPt.y - cD.mouseYPrior;

				if (!isNaN(xPos) && !isNaN(yPos)) {
					// Calculate new position of displays container.
					var newL = parseFloat(cS.left) + xPos;
					var newT = parseFloat(cS.top) + yPos;

					// Constrain new position.
					var constrainedPt = constrainPanByViewportContainerCoordinates(newL, newT);
					cS.left = constrainedPt.x + "px";
					cS.top = constrainedPt.y + "px";

					// Update stored page coordinates for next call to this function.
					cD.mouseXPrior = mPt.x;
					cD.mouseYPrior = mPt.y;

					if (Z.Navigator) {
						// Sync navigator rectangle if visible.
						var currentCenterPt = self.calculateCurrentCenterCoordinates(constrainedPt);
						Z.Navigator.syncNavigatorRectanglePosition(currentCenterPt);
					}
				}
			}
		}
		return false;
	};

	function viewerDisplayTouchEndHandler (event) {
		var event = Z.Utils.event(event);
		if (!gestureInterval && !wasGesturing) {
			mouseIsDown = false;	
			
			// End event returns touches object as undefined. Use last postion from touchmove
			// or if that has not been set use position from touchstart.
			if (typeof dragPtCurrent !== "undefined" && dragPtCurrent !== null) {
				dragPtEnd = dragPtCurrent;
			} else {
				dragPtEnd = dragPtStart;
			}
			
			var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
			if (dragDist < 4) {
				var clickZoomPt = self.getClickZoomCoords3D(event, dragPtEnd, tierCurrent, tierScale);
				if (Z.clickZoom && !Z.polygonEditing) {
					self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, clickZoomPt.z);
				} else if (Z.clickPan && !Z.polygonEditing) {
					self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, Z.imageZ);
				}else if (Z.polygonEditing) {
					// If in edit mode, handle click on or off control point with current poly or not. 
					polygonClickHandler(event, clickZoomPt);
				}		
			} else {
				if (Z.polygonEditing && (controlPointDragging || (controlPointCurrent === null && !polygonClosed))) {
					controlPointCurrent = null;
					controlPointDragging = false;
					var hC = new HotspotContext();
					var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
					if (hotspotCurrentIndex != -1) { 
						var polyCenter = Z.Utils.getCenterOfPolygonPoints(hotspots[hotspotCurrentIndex].polygonPts);
						hotspots[hotspotCurrentIndex].x = polyCenter.x;
						hotspots[hotspotCurrentIndex].y = polyCenter.y;
						clearDisplay(eD);
						displayHotspot(hotspots[hotspotCurrentIndex], hC);
						if (!polygonClosed) { Z.Utils.addEventListener(document, "mousemove", viewerDisplayMouseMoveHandler); }
					}
				}
				if (Z.mousePan) { self.updateView(); }
			}
			dragPtCurrent = null;
		}
	};

	function viewerDisplayTouchCancelHandler (event) {
		var event = Z.Utils.event(event);
		if (!gestureInterval && !wasGesturing) {
			mouseIsDown = false;
			var updateRequired = false;		
			
			// End event returns touches object as undefined. Use last postion from touchmove
			// or if that has not been set use position from touchstart.
			if (typeof dragPtCurrent !== "undefined" && dragPtCurrent !== null) {
				dragPtEnd = dragPtCurrent;
			} else {
				dragPtEnd = dragPtStart;
			}
			
			var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
			if (dragDist < 4) {
				var clickZoomPt = self.getClickZoomCoords3D(event, dragPtEnd, tierCurrent, tierScale);
				if (Z.clickZoom && !Z.polygonEditing) {
					self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, clickZoomPt.z);
				} else if (Z.clickPan && !Z.polygonEditing) {
					self.zoomAndPanToView(clickZoomPt.x, clickZoomPt.y, Z.imageZ);
				}else if (Z.polygonEditing) {
					// If in edit mode, handle click on or off control point with current poly or not. 
					polygonClickHandler(event, clickZoomPt);
				}		
			} else {
				if (Z.polygonEditing && (controlPointDragging || (controlPointCurrent === null && !polygonClosed))) {
					controlPointCurrent = null;
					controlPointDragging = false;
					var hC = new HotspotContext();
					var hotspotCurrentIndex = hotspots.indexOfObjectValue("internalID", hotspotCurrentID);
					if (hotspotCurrentIndex != -1) { 
						var polyCenter = Z.Utils.getCenterOfPolygonPoints(hotspots[hotspotCurrentIndex].polygonPts);
						hotspots[hotspotCurrentIndex].x = polyCenter.x;
						hotspots[hotspotCurrentIndex].y = polyCenter.y;
						clearDisplay(eD);
						displayHotspot(hotspots[hotspotCurrentIndex], hC);
						if (!polygonClosed) { Z.Utils.addEventListener(document, "mousemove", viewerDisplayMouseMoveHandler); }
					}
				}
				if (Z.mousePan) { self.updateView(); }
			}
			dragPtCurrent = null;
		}
	};

	function viewerDisplayGestureStartHandler (event) {
		self.zoomAndPanAllStop();
		var event = Z.Utils.event(event);
		viewerDisplayGestureChangeHandler(event); // Run once so values are defined at first movement.
		if (!gestureInterval) { gestureInterval = window.setInterval(zoomGesture, GESTURE_TEST_DURATION); }
	};

	function viewerDisplayGestureChangeHandler (event) {
		var event = Z.Utils.event(event);
		event.preventDefault();
		gestureIntervalPercent = Math.round(event.scale * 100) / 100;
	};

	function viewerDisplayGestureEndHandler (event) {
		if (gestureInterval) {
			window.clearInterval(gestureInterval);
			wasGesturing = true;
			gestureInterval = null;
		}				
		if (Z.mousePan) { self.updateView(); }
	};

	function zoomGesture (event) {
		if (!Z.mousePan) { return; }  // Disallow touch panning if parameter false.
		
		var gestureZoom = calculateGestureZoom(tierCurrent, tierScalePrior, gestureIntervalPercent);
		var gestureZoomConstrained = constrainZoom(gestureZoom);
		if (gestureZoom != Z.imageZ) { scaleTierToZoom(gestureZoomConstrained); }
	};

	function calculateGestureZoom (tier, scale, gesturePercent) {
		var newScale = scale * gesturePercent;
		var gestureZ = convertTierScaleToZoom(tier, newScale);
		return gestureZ;
	};
	
	function orientationChangeHandler (event) {
		if (Z.fullPage) { 
			if (Z.ToolbarDisplay && Z.toolbarVisible > 1) { Z.Toolbar.show(false); }
			if (Z.NavigatorDisplay && Z.navigatorVisible > 1) { Z.Navigator.setVisibility(false); }
			self.toggleFullPageView(false);
			self.toggleFullPageView(true);
			if (Z.ToolbarDisplay && (Z.toolbarVisible > 1)) { Z.Toolbar.show(true); }
			if (Z.NavigatorDisplay && Z.navigatorVisible > 1) { Z.Navigator.setVisibility(true); }
		}
	};

	function keyDownHandler (event) {
		// Disallow keyboard control if parameter false.
		if (!Z.keys) { return; }
		if (!event.altKey) { zoomAndPanToViewStop(); }
		
		var event = Z.Utils.event(event);
		switch (event.keyCode) {
			case 90: // z
				self.zoom("out");
				break;
			case 17: // control
				self.zoom("out");
				break;
			case 65: // a
				self.zoom("in");
				break;
			case 16: // shift
				self.zoom("in");
				break;
			case 37: // left arrow
				self.pan("left");
				break;
			case 38: // up arrow
				self.pan("up");
				break;
			case 40: // down arrow
				self.pan("down");
				break;
			case 39: // right arrow
				self.pan("right");
				break;
			case 27: // escape
				if (!Z.fullPage) {
					self.reset();
				} else {
					self.toggleFullPageView(false);
				}
				break;
		}
	};

	function keyUpHandler (event) {
		// Disallow keyboard control if parameter false.
		if (!Z.keys) { return; }
		var event = Z.Utils.event(event);
		var kc = event.keyCode;
		if (kc == 90 || kc == 17 || kc == 65 || kc == 16) {  // z, ctrl, a, and shift keys
			self.zoom("stop");
		} else if (kc == 37 || kc == 39) {  // left and right arrow keys
			self.pan("horizontalStop");
		} else if (kc == 38 || kc == 40) {  // up and down arrow keys
			self.pan("verticalStop");
		}
	};
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::: TOOLBAR FUNCTIONS ::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.ZoomifyToolbar = function (tbViewport) {

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::::: INIT FUNCTIONS :::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// Declare variables for toolbar internal self-reference and for initialization completion.
	var self = this;
	var isInitialized = false;
	
	// Load toolbar skins XML file and determine selection mode setting for optional support of
	// small screen devices with large graphic files. Build names list for 39 skin files of the toolbar.
	Z.skinPath = Z.Utils.removeTrailingSlashCharacters(Z.skinPath);
	var netConnector = new Z.NetConnector();
	netConnector.loadXML(Z.skinPath + "/" + Z.Utils.getResource("DEFAULT_SKINXMLFILE"));

	// Declare variables for Toolbar and slider.
	var tlbrH, tbS, trS, trsS, btS, btsS;
	var toolbarDimensions = []
	var SLIDER_TEST_DURATION = parseInt(Z.Utils.getResource("DEFAULT_SLIDERTESTDURATION"), 10);
	var buttonSliderDown = false;
	var sliderInterval = null, sliderIntervalMousePt = null;
	var progressInterval = null;
	var overrideSlider, overrideProgress, overrideLogo;

	function initializeToolbar (tlbrSknDims, tlbrSknArr) {
		// Create Toolbar display area for Toolbar buttons and set size and position.
		Z.ToolbarDisplay = Z.Utils.createContainerElement("div", "ToolbarDisplay", "inline-block", "absolute", "hidden", "1px", "1px", "0px", "1px", "none", "0px", "transparent none", "0px", "0px", "normal", "default");
		tbS = Z.ToolbarDisplay.style;

		var background = new Z.Utils.Graphic("background", Z.skinPath, tlbrSknArr[0], "1px", "1px", "0px", "0px");
		Z.ToolbarDisplay.appendChild(background.elmt);

		// Create toolbar global array to hold skin sizes from XML but use placeholders here
		// and apply actual sizes in drawLayout function called in sizeAndPosition function.
		toolbarSkinSizes = tlbrSknDims;

		if (Z.logoVisible) {
			var toolbarLogo;
			if (!(Z.Utils.isStrVal(Z.logoCustomPath))) {
				toolbarLogo = new Z.Utils.Graphic("toolbarLogo", Z.skinPath, tlbrSknArr[1], "1px", "1px", "1px", "1px");
			} else {
				var logoPath = Z.Utils.cacheProofPath(Z.logoCustomPath);
				toolbarLogo = new Z.Utils.Graphic("toolbarLogo", logoPath, null, "1px", "1px", "1px", "1px");
			}
			Z.ToolbarDisplay.appendChild(toolbarLogo.elmt);

			if (Z.toolbarVisible == 0 || Z.toolbarVisible == 1) {
				var logoDivider = new Z.Utils.Graphic("logoDivider", Z.skinPath, tlbrSknArr[2], "1px", "1px", "1px", "1px");
				Z.ToolbarDisplay.appendChild(logoDivider.elmt);
			}
		}

		// Add button container to handle background mouseover events instead of button mouseout events.
		var buttonContainer = Z.Utils.createContainerElement("div", "buttonContainer", "inline-block", "absolute", "visible", "1px", "1px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal", "default");
		Z.ToolbarDisplay.appendChild(buttonContainer);
		if (!Z.mobileDevice) {
			Z.Utils.addEventListener(buttonContainer, "mousedown", Z.Utils.preventDefault);
			Z.Utils.addEventListener(buttonContainer, "mouseover", backgroundEventsHandler);
		} else {
			Z.Utils.addEventListener(buttonContainer, "touchstart", Z.Utils.preventDefault);
		}

		// Add background graphic to button container to ensure IE events fire.
		var buttonBackground = new Z.Utils.Graphic("buttonBackground", Z.skinPath, tlbrSknArr[0], "1px", "1px", "0px", "0px");
		buttonContainer.appendChild(buttonBackground.elmt);
		
		if ((Z.toolbarVisible != 0 && Z.toolbarVisible != 1) || Z.mobileDevice) {
			var buttonMinimize = new Z.Utils.Button("buttonMinimize", null, Z.skinPath, tlbrSknArr[3], tlbrSknArr[4], tlbrSknArr[5], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_MINIMIZE");
			Z.ToolbarDisplay.appendChild(buttonMinimize.elmt);
			var buttonExpand = new Z.Utils.Button("buttonExpand", null, Z.skinPath, tlbrSknArr[6], tlbrSknArr[7], tlbrSknArr[8], "1px", "1px", "1px", "1px",  "mouseover",buttonEventsHandler, "TIP_EXPAND");
			Z.ToolbarDisplay.appendChild(buttonExpand.elmt);
		}

		var buttonZoomOut = new Z.Utils.Button("buttonZoomOut", null, Z.skinPath, tlbrSknArr[9], tlbrSknArr[10], tlbrSknArr[11], "1px", "1px", "1px", "1px",  "mouseover",buttonEventsHandler, "TIP_ZOOMOUT");
		buttonContainer.appendChild(buttonZoomOut.elmt);

		if (Z.sliderVisible) {
			var trackSlider = new Z.Utils.Graphic("trackSlider", Z.skinPath, tlbrSknArr[12], "1px", "1px", "0px", "0px");
			buttonContainer.appendChild(trackSlider.elmt);
			Z.Utils.addEventListener(trackSlider.elmt, "mousedown", buttonEventsHandler);
			Z.Utils.addEventListener(trackSlider.elmt, "touchstart", buttonEventsHandler);
			var buttonSlider = new Z.Utils.Button("buttonSlider", null, Z.skinPath, tlbrSknArr[14], tlbrSknArr[15], tlbrSknArr[16], "1px", "1px", "1px", "1px",  "mouseover",buttonEventsHandler, "TIP_SLIDER");
			buttonContainer.appendChild(buttonSlider.elmt);
		}

		var buttonZoomIn = new Z.Utils.Button("buttonZoomIn", null, Z.skinPath, tlbrSknArr[17], tlbrSknArr[18], tlbrSknArr[19], "1px", "1px", "1px", "1px",  "mouseover",buttonEventsHandler, "TIP_ZOOMIN");
		buttonContainer.appendChild(buttonZoomIn.elmt);

		var panDivider = new Z.Utils.Graphic("panDivider", Z.skinPath, tlbrSknArr[20], "1px", "1px","1px", "1px");
		buttonContainer.appendChild(panDivider.elmt);
		var buttonPanLeft = new Z.Utils.Button("buttonPanLeft", null, Z.skinPath, tlbrSknArr[21], tlbrSknArr[22], tlbrSknArr[23], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_PANLEFT");
		buttonContainer.appendChild(buttonPanLeft.elmt);
		var buttonPanUp = new Z.Utils.Button("buttonPanUp", null, Z.skinPath, tlbrSknArr[24], tlbrSknArr[25], tlbrSknArr[26], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_PANUP");
		buttonContainer.appendChild(buttonPanUp.elmt);
		var buttonPanDown = new Z.Utils.Button("buttonPanDown", null, Z.skinPath, tlbrSknArr[27], tlbrSknArr[28], tlbrSknArr[29], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_PANDOWN");
		buttonContainer.appendChild(buttonPanDown.elmt);
		var buttonPanRight = new Z.Utils.Button("buttonPanRight", null, Z.skinPath, tlbrSknArr[30], tlbrSknArr[31], tlbrSknArr[32], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_PANRIGHT");
		buttonContainer.appendChild(buttonPanRight.elmt);
		var buttonReset = new Z.Utils.Button("buttonReset", null, Z.skinPath, tlbrSknArr[33], tlbrSknArr[34], tlbrSknArr[35], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_RESET");
		buttonContainer.appendChild(buttonReset.elmt);

		if (Z.fullPageVisible) {
			var fullPageDivider = new Z.Utils.Graphic("fullPageDivider", Z.skinPath, tlbrSknArr[36], "1px", "1px", "1px", "1px");
			buttonContainer.appendChild(fullPageDivider.elmt);
			var buttonFullPage = new Z.Utils.Button("buttonFullPage", null, Z.skinPath, tlbrSknArr[37], tlbrSknArr[38], tlbrSknArr[39], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_TOGGLEFULLPAGE");
			buttonContainer.appendChild(buttonFullPage.elmt);
		}
		
		// Block creation of edit buttons in non-canvas browsers as currently only used for polygons.
		if (Z.editMode && Z.useCanvas) { 
			var buttonEditMode = new Z.Utils.Button("buttonEditMode", null, Z.skinPath, tlbrSknArr[40], tlbrSknArr[41], tlbrSknArr[42], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_TOGGLEEDITMODE");
			buttonContainer.appendChild(buttonEditMode.elmt);
			var buttonEditCancel = new Z.Utils.Button("buttonEditCancel", null, Z.skinPath, tlbrSknArr[43], tlbrSknArr[44], tlbrSknArr[45], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_EDITCANCEL");
			buttonContainer.appendChild(buttonEditCancel.elmt);
			var buttonEditDelete = new Z.Utils.Button("buttonEditDelete", null, Z.skinPath, tlbrSknArr[46], tlbrSknArr[47], tlbrSknArr[48], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_EDITDELETE");
			buttonContainer.appendChild(buttonEditDelete.elmt);
			var buttonEditSave = new Z.Utils.Button("buttonEditSave", null, Z.skinPath, tlbrSknArr[49], tlbrSknArr[50], tlbrSknArr[51], "1px", "1px", "1px", "1px", "mouseover", buttonEventsHandler, "TIP_EDITSAVE");
			buttonContainer.appendChild(buttonEditSave.elmt);
		}

		if (Z.progressVisible) {
			// Create with placeholder size and position until drawLayout.
			var progressTextBox = Z.Utils.createContainerElement("div", "progressTextBox", "inline-block", "absolute", "hidden", "1px", "1px", "1px", "1px", "none", "0px", "transparent none", "0px", "0px", "normal");
			var progressFontSize=toolbarSkinSizes[16];
			buttonContainer.appendChild(progressTextBox);
			var progressTextNode = document.createTextNode(Z.Utils.getResource("DEFAULT_PROGRESSTEXT"));
			progressTextBox.appendChild(Z.Utils.createCenteredElement(progressTextNode));
			Z.Utils.setTextStyle(progressTextNode, "black", "verdana", progressFontSize + "px", "none", "normal", "normal", "normal", "normal", "1em", "left", "none");

			// Prevent text selection and context menu.
			Z.Utils.addEventListener(progressTextBox, "contextmenu", Z.Utils.preventDefault);
			Z.Utils.disableTextInteraction(progressTextNode);
		}

		// Add toolbar to viewer display..
		Z.ViewerDisplay.appendChild(Z.ToolbarDisplay);

		// Set toolbar size, position, and visibility.
		Z.toolbarW = toolbarSkinSizes[0];
		Z.toolbarCurrentW = (Z.toolbarW == -1) ? Z.viewerW : Z.toolbarW;
		Z.toolbarH = tlbrH = toolbarSkinSizes[1];
		var toolbarTop = (Z.toolbarPosition == 1) ? Z.viewerH - tlbrH : 0;
		sizeAndPosition(Z.toolbarCurrentW, Z.toolbarH, 0, toolbarTop);

		if (Z.Viewport && Z.Viewport.getInitialized()) {
			var currentZ = Z.Viewport.getZoom();
			syncSliderToViewport(currentZ);
		}

		show(Z.toolbarVisible == 1 || Z.toolbarVisible == 2 || Z.toolbarVisible == 4);
		
		// Prevent event bubbling.
		Z.Utils.addEventListener(Z.ToolbarDisplay, "mouseover", Z.Utils.stopPropagation);

		setInitialized(true);
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::: GET & SET FUNCTIONS :::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	this.getInitialized = function () {
		return getInitialized();
	};

	this.setSizeAndPosition = function (width, height, left, top) {
		sizeAndPosition(width, height, left, top);
	};

	this.show = function (value) {
		show(value);
	};
	
	this.setVisibility = function (visible) {
		visibility(visible);
	};
	
	this.minimize = function (value) {
		minimize(value);
	};

	this.showProgress = function () {
		var ptB = document.getElementById("progressTextBox");
		if (ptB) {
			var ptbS = ptB.style;
			if (ptbS) {
				ptbS.display = "inline-block";
			}
		}
	};

	this.hideProgress = function () {
		var ptB = document.getElementById("progressTextBox");
		if (ptB) {
			var ptbS = ptB.style;
			if (ptbS) {
				ptbS.display = "none";
			}
		}
	};

	this.updateProgress = function (total, current) {
		if (Z.progressVisible) {
			if (progressInterval) { window.clearInterval(progressInterval); }
			var percentComplete;
			var ptn = document.getElementById("progressTextBox").firstChild.firstChild.firstChild.firstChild;
			if (ptn) {
				if (total == 0 || current == 0) {
					ptn.nodeValue = "llllllllll"
					progressInterval = window.setInterval(clearProgress, parseInt(Z.Utils.getResource("DEFAULT_PROGRESSDURATION")), 10);
				} else {
					percentComplete = Math.round(100 - (current / total) * 100);
					ptn.nodeValue = "l".multiply(Math.round(percentComplete / 10));
				}
			}
		}
	};

	function clearProgress () {
		window.clearInterval(progressInterval);
		progressInterval = null;
		var ptn = document.getElementById("progressTextBox").firstChild.firstChild.firstChild.firstChild;
		if (ptn) { ptn.nodeValue = ""; }
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::: CORE FUNCTIONS :::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	function getInitialized () {
		return isInitialized;
	};

	function setInitialized (value) {
		isInitialized = value;
	};
	
	this.parseSkinXML = function (xmlDoc) {	
		// Get selection mode for optional small screen graphics fileset.
		Z.skinMode = xmlDoc.getElementsByTagName("SETUP")[0].attributes.getNamedItem("SKINMODE").nodeValue;
		var skinFolder, skinSizesTag;
		if (Z.skinMode == 1 || (Z.skinMode == 0 && !Z.mobileDevice)) {
			skinFolder = xmlDoc.getElementsByTagName("SETUP")[0].attributes.getNamedItem("FOLDERSTANDARD").nodeValue;
			skinSizesTag = "SIZESSTANDARD";
		} else {
			skinFolder = xmlDoc.getElementsByTagName("SETUP")[0].attributes.getNamedItem("FOLDERLARGE").nodeValue;
			skinSizesTag = "SIZESLARGE";
		}

		// Get toolbar element dimensions.
		var toolbarSkinSizes = [];
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("TOOLBARW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("TOOLBARH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("LOGOW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("LOGOH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("DIVIDERW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("DIVIDERH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("BUTTONW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("BUTTONH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("BUTTONSPAN").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("SLIDERBUTTONW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("SLIDERBUTTONH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("SLIDERTRACKW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("SLIDERTRACKH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("SLIDERSPAN").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("PROGRESSW").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("PROGRESSH").nodeValue));
		toolbarSkinSizes.push(parseFloat(xmlDoc.getElementsByTagName(skinSizesTag)[0].attributes.getNamedItem("PROGRESSFONTSIZE").nodeValue));

		// Get names of skin files of the Zoomify Toolbar.
		var toolbarSkinFilePaths = [];
		
		var skinCount, skinFirstAtt, skinFirst, skinLastAtt, skinLast;
		skinCount = (Z.editMode) ? 51: 39;			
		skinFirstAtt = xmlDoc.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN0");
		if (skinFirstAtt !== null) { skinFirst = skinFirstAtt.nodeValue; }		
		skinLastAtt = xmlDoc.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN" + skinCount.toString());
		if (skinLastAtt !== null) { skinLast = skinLastAtt.nodeValue; }
		
		if (typeof skinFirst !== "undefined" && Z.Utils.isStrVal(skinFirst) && typeof skinLast !== "undefined" && Z.Utils.isStrVal(skinLast)) {
			var xmlMissingNames = false;
			for (var i = 0; i < (skinCount + 1); i++) {
				var skinCounter = xmlDoc.getElementsByTagName("FILES")[0].attributes.getNamedItem("SKIN" + i).nodeValue;
				if (Z.Utils.isStrVal(skinCounter)) {
					toolbarSkinFilePaths[i] = skinFolder + "/" + skinCounter;
				} else {
					toolbarSkinFilePaths[i] = "null";
					xmlMissingNames = true;
				}
			}
			if (xmlMissingNames) { Z.Utils.showMessage(Z.Utils.getResource("ERROR_SKINXMLMISSINGNAMES")); }
			initializeToolbar(toolbarSkinSizes, toolbarSkinFilePaths);
		} else {
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_SKINXMLINVALID"));
		}
	};
	
	function sizeAndPosition (width, height, left, top) {
		if (typeof width === "undefined" || width === null) { 
			width = (Z.toolbarVisible > 0) ? Z.toolbarCurrentW : 0; 
		} else {
			Z.toolbarCurrentW = width;
		}				
		if (typeof height === "undefined" || height === null) { height = (Z.toolbarVisible > 0) ? tlbrH : 0; }
		if (typeof left === "undefined" || left === null) { left = 0; }
		if (typeof top === "undefined" || top === null) { top = (Z.toolbarPosition == 1) ? Z.viewerH - tlbrH : 0; }
		var tbS = Z.ToolbarDisplay.style;
		tbS.width = width + "px";
		tbS.height = height + "px";
		tbS.left = left + "px";
		tbS.top = top + "px";
		drawLayout(width, height);
	};

	function drawLayout (width, height) {
		// Set toolbar width and height as specified in the call to this function by the
		// sizeAndPosition function.  That function tests for null assignments and uses
		// preset values from the Skins XML file if appropriate.
		var toolbarW = width;
		var toolbarH = height;

		 // Set remaining values to the values in the Skins XML file.
		var logoW = toolbarSkinSizes[2];
		var logoH = toolbarSkinSizes[3];
		var dvdrW = toolbarSkinSizes[4];
		var dvdrH = toolbarSkinSizes[5];
		var btnW = toolbarSkinSizes[6];
		var btnH = toolbarSkinSizes[7];
		var btnSpan = toolbarSkinSizes[8];
		var sldrBtnW = toolbarSkinSizes[9];
		var sldrBtnH = toolbarSkinSizes[10];
		var sldrTrkW = toolbarSkinSizes[11];
		var sldrTrkH = toolbarSkinSizes[12];
		var sldrSpan = toolbarSkinSizes[13];
		var prgW = toolbarSkinSizes[14];
		var prgH = toolbarSkinSizes[15];

		// Calculate positioning values.
		var dx = 0;
		var logoTOffset = (toolbarH - logoH) / 2 + 1;
		var dvdrTOffset = (toolbarH - dvdrH) / 2;
		var btnTOffset = (toolbarH - btnH) / 2;
		var btnMinExpTOffset = (btnTOffset * 1.3);
		var sldrTrkTOffset = btnTOffset + 4;
		var btnSldrTOffset = btnTOffset + 2;
		var btnMinSpan = (Z.logoVisible == 1) ? 0 : btnSpan / 2;
		var btnExpSpan = (Z.logoVisible == 1) ? 0 : btnSpan / 2;
		var dvdrSpan = btnSpan - (btnW - dvdrW);
		var btnCount = (Z.fullPageVisible) ? 8 : 7;
		var btnContainerMargin = 20;
		var btnSetW = (btnCount * btnSpan) + (2 * dvdrSpan);
		if (Z.sliderVisible) { btnSetW += sldrSpan; }

		// Validate toolbar contents fit within toolbar width. If not, implement overrides. First
		// hide slider and recalculate. Next hide, progress display.  Finally, hide logo and
		// minimize and maximize buttons.
		overrideSlider = overrideProgress = overrideLogo = false;
		var logoOffset = (Z.logoVisible == 1) ? logoW + 2 : 0;
		var minBtnOffset = (Z.toolbarVisible != 0 && Z.toolbarVisible != 1) ? btnSpan : 0;
		var logoButtonSetW = logoOffset + minBtnOffset;
		var toolbarContentsW = logoButtonSetW + btnContainerMargin + btnSetW + btnContainerMargin + prgW;
		if (toolbarContentsW > toolbarW) {
			overrideSlider = true;
			if ((toolbarContentsW - sldrSpan) > toolbarW) {
				overrideProgress = true;
				if ((toolbarContentsW - sldrSpan - prgW) > toolbarW) {
					overrideLogo = true;
					logoButtonSetW = 0;
				}
				prgW = 0;
			}
			btnSetW -= sldrSpan;
		}

		// Calculate position for main button set between logo and progress display.
		var btnSetL = logoButtonSetW + ((((toolbarW - prgW) - logoButtonSetW) - btnSetW) / 2);

		// Set the sizes and positions of the toolbar contents.
		var bG = document.getElementById("background");
		bG.style.width = toolbarW + "px";
		bG.firstChild.style.width = toolbarW + "px";
		bG.style.height = toolbarH + "px";
		bG.firstChild.style.height = toolbarH + "px";

		var bC = document.getElementById("buttonContainer");
		bC.style.width = (btnSetW + (btnContainerMargin * 2)) + "px";
		bC.style.height = toolbarH + "px";
		bC.style.left = (btnSetL - btnContainerMargin) + "px";

		var bB = document.getElementById("buttonBackground");
		bB.style.width = toolbarW + "px";
		Z.Utils.graphicSize(bB, parseFloat(bC.style.width), parseFloat(bC.style.height));
		bB.style.left = "0px";

		var tbL = document.getElementById("toolbarLogo");
		if (tbL) {
			var tblS = tbL.style;
			if (tblS) {
				if (!overrideLogo) {
					tblS.display = "inline-block";
					Z.Utils.graphicSize(tbL, logoW, logoH);
					tblS.left = dx + "px";
					tblS.top = logoTOffset + "px";
					dx += logoW + 2;
					var logoD = document.getElementById("logoDivider");
					if (logoD) {
						Z.Utils.graphicSize(logoD, dvdrW, dvdrH);
						var ldS = logoD.style;
						ldS.left = dx + "px";
						ldS.top = dvdrTOffset + "px";
					}
				} else {
					tblS.display = "none";
				}
			}
		}

		if (Z.toolbarVisible != 0 && Z.toolbarVisible != 1) {
			var bM = document.getElementById("buttonMinimize");
			var bE = document.getElementById("buttonExpand");
			if (bM && bE) {
				var bmS = bM.style;
				var beS = bE.style;
				if (bmS && beS) {
					if (!overrideLogo) {
						bmS.display = "inline-block";
						beS.display = "inline-block";
						Z.Utils.buttonSize(bM, btnW, btnH);
						Z.Utils.buttonSize(bE, btnW, btnH);
						bmS.left = dx + btnMinSpan + "px";
						bmS.top = btnMinExpTOffset + "px";
						beS.left = dx + btnExpSpan + "px";
						beS.top = btnMinExpTOffset + "px";
					} else {
						bmS.display = "none";
						beS.display = "none";
					}
				}
			}
		}

		dx = btnContainerMargin; // Reset to adjust for placement within buttonContainer which is offset.

		var bZO = document.getElementById("buttonZoomOut");
		Z.Utils.buttonSize(bZO, btnW, btnH);
		var bzoS = bZO.style;
		bzoS.left = dx + "px";
		bzoS.top = btnTOffset + "px";
		dx += btnSpan;

		var trS = document.getElementById("trackSlider");
		var btS = document.getElementById("buttonSlider");
		if (trS && btS) {
			var trsS = trS.style;
			var btsS = btS.style;
			if (trsS && btsS) {
				if (!overrideSlider) {
					trsS.display = "inline-block";
					btsS.display = "inline-block";
					Z.Utils.graphicSize(trS, sldrTrkW, sldrTrkH);
					trsS.left = (dx - 2) + "px";
					trsS.top = sldrTrkTOffset + "px";
					Z.Utils.buttonSize(btS, sldrBtnW, sldrBtnH);
					btsS.left = parseFloat(trsS.left) + "px";
					btsS.top = btnSldrTOffset + "px";
					dx += sldrSpan;
				} else {
					trsS.display = "none";
					btsS.display = "none";
				}
			}
		}

		var bZI = document.getElementById("buttonZoomIn");
		Z.Utils.buttonSize(bZI, btnW, btnH);
		var bziS = bZI.style;
		bziS.left = dx + "px";
		bziS.top = btnTOffset + "px";
		dx += btnSpan + 1;

		var pD = document.getElementById("panDivider");
		Z.Utils.graphicSize(pD, dvdrW, dvdrH);
		var pdS = pD.style;
		pdS.left = dx + "px";
		pdS.top = dvdrTOffset + "px";
		dx += dvdrSpan;
		var bPL = document.getElementById("buttonPanLeft");
		Z.Utils.buttonSize(bPL, btnW, btnH);
		var bplS = bPL.style;
		bplS.left = dx + "px";
		bplS.top = btnTOffset + "px";
		dx += btnSpan;
		var bPU = document.getElementById("buttonPanUp");
		Z.Utils.buttonSize(bPU, btnW, btnH);
		var bpuS = bPU.style;
		bpuS.left = dx + "px";
		bpuS.top = btnTOffset + "px";
		dx += btnSpan;
		var bPD = document.getElementById("buttonPanDown");
		Z.Utils.buttonSize(bPD, btnW, btnH);
		var bpdS = bPD.style;
		bpdS.left = dx + "px";
		bpdS.top = btnTOffset + "px";
		dx += btnSpan;
		var bPR = document.getElementById("buttonPanRight");
		Z.Utils.buttonSize(bPR, btnW, btnH);
		var bprS = bPR.style;
		bprS.left = dx + "px";
		bprS.top = btnTOffset + "px";
		dx += btnSpan;
		var bR = document.getElementById("buttonReset");
		Z.Utils.buttonSize(bR, btnW, btnH);
		var brS = bR.style;
		brS.left = dx + "px";
		brS.top = btnTOffset + "px";
		dx += btnSpan + 1;

		var fpD = document.getElementById("fullPageDivider");
		if (fpD) {
			Z.Utils.graphicSize(fpD, dvdrW, dvdrH);
			var fpdS = fpD.style;
			fpdS.left = dx + "px";
			fpdS.top = dvdrTOffset + "px";
			dx += dvdrSpan;
			var bFP = document.getElementById("buttonFullPage");
			Z.Utils.buttonSize(bFP, btnW, btnH);
			var bfpS = bFP.style;
			bfpS.left = dx + "px";
			bfpS.top = btnTOffset + "px";
		}

		var bEM = document.getElementById("buttonEditMode");
		if (bEM) {
			dx += btnSpan + 10;
			Z.Utils.buttonSize(bEM, btnW, btnH);
			var bemS = bEM.style;
			bemS.left = dx + "px";
			bemS.top = btnTOffset + "px";
		}

		var bEC = document.getElementById("buttonEditCancel");
		if (bEC) {
			// Delete button should overlap Edit button as only one will be shown at a time.
			//dx += btnSpan + 1;
			
			Z.Utils.buttonSize(bEC, btnW, btnH);
			var becS = bEC.style;
			becS.left = dx + "px";
			becS.top = btnTOffset + "px";
			becS.visibility = "hidden";
		}

		var bED = document.getElementById("buttonEditDelete");
		if (bED) {
			dx += btnSpan + 1; 
			Z.Utils.buttonSize(bED, btnW, btnH);
			var bedS = bED.style;
			bedS.left = dx + "px";
			bedS.top = btnTOffset + "px";
			bedS.visibility = "hidden";
		}

		var bES = document.getElementById("buttonEditSave");
		if (bES) {
			dx += btnSpan + 1;
			Z.Utils.buttonSize(bES, btnW, btnH);
			var besS = bES.style;
			besS.left = dx + "px";
			besS.top = btnTOffset + "px";
			besS.visibility = "hidden";
		}

		var ptB = document.getElementById("progressTextBox");
		if (ptB) {
			var ptbS = ptB.style;
			if (ptbS) {
				if (!overrideProgress) {
					ptbS.display = "inline-block";
					ptbS.width = prgW + "px";
					ptbS.height = prgH + "px";
					ptbS.left = (toolbarW - parseFloat(bC.style.left) - parseFloat(ptbS.width)) + "px";
					ptbS.top = ((toolbarH - parseFloat(ptbS.height)) / 2) + "px";
				} else {
					ptbS.display = "none";
				}
			}
		}
	};

	function show (value) {
		if (Z.toolbarVisible < 4 && !Z.mobileDevice) {
			visibility(value);
		} else {
			minimize(!value);
		}
	};

	function visibility (visible) {
		if (tbS) {
			if (visible) {
				tbS.display = "inline-block";
			} else {
				tbS.display = "none";
			}
		}
	};

	function minimize (value) {
		if (tbS) {
			var bC = document.getElementById("buttonContainer");
			var bG = document.getElementById("background");
			var bM = document.getElementById("buttonMinimize");
			var bE = document.getElementById("buttonExpand");
			var logoD = document.getElementById("logoDivider");
			var minW = 0;
			if (!overrideLogo) { minW = parseFloat(bE.style.left) + parseFloat(bE.style.width) + 4; }
			var expW = Z.toolbarCurrentW;
			if (value) {
				bC.style.display = "none";
				if (!overrideLogo) {
					if (logoD) { logoD.style.display = "none"; }
					bM.style.display = "none";
					bE.style.display = "inline-block";
				}
				tbS.width = minW + "px";
				bG.style.width = minW + "px";
			} else {
				bC.style.display = "inline-block";
				if (!overrideLogo) {
					if (logoD) { logoD.style.display = "inline-block"; }
					bM.style.display = "inline-block";
					bE.style.display = "none";
				}
				tbS.width = expW + "px";
				bG.style.width = expW + "px";
			}
		}
	};

	this.syncSliderToViewport = function (imageZoom) {
		syncSliderToViewport(imageZoom);
	};

	function syncSliderToViewport (imageZoom) {
		if (Z.sliderVisible) {
			if (!trS) { trS = document.getElementById("trackSlider"); }
			if (!trsS) { trsS = trS.style; }
			if (!btS) { btS = document.getElementById("buttonSlider"); }
			if (!btsS) { btsS = btS.style; }
			if (trsS && btsS) {
				var imageSpan = Z.maxZ - Z.minZ;
				var sliderPercent = (imageZoom - Z.minZ) / imageSpan;
				trackL = parseFloat(trsS.left);
				trackR = parseFloat(trsS.left) + parseFloat(trsS.width) - parseFloat(btsS.width);
				var trackSpan = trackR - trackL;
				var sliderPosition = (sliderPercent * trackSpan) + trackL;
				btsS.left = sliderPosition + "px";
			}
		}
	};

	function sliderSnap (event) {
		if (!trS) { trS = document.getElementById("trackSlider"); }
		if (!trsS) { trsS = trS.style; }
		if (trS && trsS) {
			var sliderClick;
			var tsPt = Z.Utils.getElementPosition(trS);
			if (!Z.mobileDevice) {
				sliderClick = event.clientX - tsPt.x;
			} else {
				sliderClick = Z.Utils.getMousePosition(event).x - tsPt.x;
			}
			var sliderZoom = calculateSliderZoom(sliderClick, 0, parseFloat(trsS.width));
			if (sliderZoom < Z.minZ + 0.1) { sliderZoom = Z.minZ; }
			if (sliderZoom > Z.maxZ - 0.1) { sliderZoom = Z.maxZ; }
			tbViewport.scaleTierToZoom(sliderZoom);
			tbViewport.updateView();
		}
	};

	function sliderSlideStart (event) {
		buttonSliderDown = true;
		if (!btS) { btS = document.getElementById("buttonSlider"); }
		if (btS) {
			var mPt = Z.Utils.getMousePosition(event);
			btS.mouseXPrior = mPt.x;
			btS.mouseYPrior = mPt.y;
		}
	};

	function sliderSlide (event) {
		if (!trS) { trS = document.getElementById("trackSlider"); }
		if (!trsS) { trsS = trS.style; }
		if (!btS) { btS = document.getElementById("buttonSlider"); }
		if (!btsS) { btsS = btS.style; }
		if (trsS && btS && btsS) {
			trackL = parseFloat(trsS.left);
			trackR = parseFloat(trsS.left) + parseFloat(trsS.width) - parseFloat(btsS.width);
			var sliderPosition = parseFloat(btsS.left) + (sliderIntervalMousePt.x - btS.mouseXPrior);
			if (sliderPosition < trackL) { 
				sliderPosition = trackL;		
			} else if (sliderPosition > trackR) { 
				sliderPosition = trackR; 
			} else {					
				btS.mouseXPrior = sliderIntervalMousePt.x;
			}
			btsS.left = sliderPosition + "px";
			var sliderZoom = calculateSliderZoom(sliderPosition, trackL, trackR);
			tbViewport.scaleTierToZoom(sliderZoom); 
		}
	};

	function sliderSlideEnd () {
		buttonSliderDown = false;
		tbViewport.updateView();
	};

	function calculateSliderZoom (sliderPosition, trackL, trackR) {
		var trackSpan = trackR - trackL;
		var sliderPercent = (sliderPosition - trackL) / trackSpan;
		var imageSpan = Z.maxZ - Z.minZ;
		var sliderZoom = Z.minZ + (imageSpan * sliderPercent);
		return sliderZoom;
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::::: EVENT FUNCTIONS ::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	function backgroundEventsHandler (event) {
		// Handle all button mouseout events as background mouseover events to simplify
		// management of button image swap events and crossbrowser compatibility.
		var event = Z.Utils.event(event);
		var relatedTarget = Z.Utils.relatedTarget(event);
		if (!buttonSliderDown && relatedTarget) {
			var targetBtn = relatedTarget.parentNode;
			buttonHandlerAndGraphicsReset(targetBtn);
		}
	};

	function buttonEventsHandler (event) {
		// Handle all events and button graphics states by clearing all event handlers on exit
		// and resetting this handler as event broker. Prevent right mouse button use. Note that
		// call to buttonsAllReset is redundant vs call by background mouseover handler only if
		// move slowly between buttons, not if move fast or if move directly off toolbar.
		if (Z.mobileDevice) { event.preventDefault(); }  // Prevent copy menu in mobile OS browsers.
		var event = Z.Utils.event(event);
		var target = Z.Utils.target(event);
		var relatedTarget = Z.Utils.relatedTarget(event);

		// Clear all button event handlers and graphics when any button event occurs - unless
		// sliding slider and accidentally mouse or touch over other button. Then set current
		// event and graphics states for current button.
		if (target) {
			var targetParent = target.parentNode;
			if (targetParent) { targetParentID = targetParent.id; }
		}
		if (relatedTarget) { 
			var relatedTargetParent = relatedTarget.parentNode;
			if (relatedTargetParent) { relatedTargetParentID = relatedTargetParent.id; }
		}
		if (!buttonSliderDown || event.type == "mouseup" || event.type == "touchend" || event.type == "touchcancel") {
			buttonsAllReset(); 
			if (target && !Z.Utils.isRightMouseButton(event)) {
				if (targetParentID && targetParentID != "trackSlider" && event.type != "mousemove") {
					buttonEventHandlersRemove(event);
					buttonGraphicsUpdate(event);
				}
				buttonEventHandlersUpdate(event);
			}
		}
	};

	function buttonHandlerAndGraphicsReset (targetBtn) {
		// Reset button state if mouse-out or mouse-drag-out.
		if (tbViewport) { tbViewport.zoomAndPanAllStop(); }
		
		if (targetBtn && Z.Utils.isStrVal(targetBtn.id)) {
			if (targetBtn.id.indexOf("button") != -1) {
				buttonEventHandlersReset(targetBtn);
				buttonGraphicsReset(targetBtn, null);
			} else if (targetBtn.id.indexOf("background") != -1) {
				buttonsAllReset();
			}
		}
	};

	function buttonEventHandlersReset (targetBtn) {
		Z.Utils.removeEventListener(targetBtn, "mousedown", buttonEventsHandler);
		Z.Utils.removeEventListener(targetBtn, "mouseup", buttonEventsHandler);
		Z.Utils.removeEventListener(targetBtn, "mouseout", buttonEventsHandler);
		Z.Utils.addEventListener(targetBtn, "mouseover", buttonEventsHandler);
	};
	
	this.buttonGraphicsReset = function (targetBtn, override) {
		buttonGraphicsReset(targetBtn, override);
	};

	function buttonGraphicsReset (targetBtn, override) {
		var iU = document.getElementById(targetBtn._imgUpID);
		var iO = document.getElementById(targetBtn._imgOverID);
		var iD = document.getElementById(targetBtn._imgDownID);
		if (iU) { 
			iU.style.visibility = (override !== null) ? override : "visible"; 
		}
		if (iO) { iO.style.visibility = "hidden"; }
		if (iD) { iD.style.visibility = "hidden"; }
	};

	function buttonsAllReset () {
		var toolbarChildren = Z.ToolbarDisplay.childNodes;
		var toolbarChild = null;
		for (var i = 0, j = toolbarChildren.length; i < j; i++) {
			toolbarChild =  toolbarChildren[i];
			if (toolbarChild.id && toolbarChild.id.indexOf("button") != -1) {
				if (toolbarChild.id != "buttonContainer") {
					buttonEventHandlersReset(toolbarChild);
					buttonGraphicsReset(toolbarChild, null);
				} else {
					var toolbarSubchildren = toolbarChild.childNodes;
					var toolbarSubchild = null;
					for (var k = 0, m = toolbarSubchildren.length; k < m; k++) {
						toolbarSubchild = toolbarSubchildren[k];
						if (toolbarSubchild.id && toolbarSubchild.id.indexOf("button") != -1) {
							// Reset all button graphics - unless in edit mode, then other code sets Edit button or Cancel/Delete/Save buttons visible.
							if (!Z.editMode || (toolbarSubchild.id != "buttonEditMode" && toolbarSubchild.id != "buttonEditCancel" && toolbarSubchild.id != "buttonEditDelete" && toolbarSubchild.id != "buttonEditSave")) {
								buttonEventHandlersReset(toolbarSubchild);
								buttonGraphicsReset(toolbarSubchild, null);
							}
						}
					}
				}
			}
		}
	};

	function buttonEventHandlersRemove (event) {
		var target = Z.Utils.target(event);
		if (target) {
			var targetBtn = target.parentNode;
			if (targetBtn) {
				if (!Z.mobileDevice) {
					Z.Utils.removeEventListener(targetBtn, "mouseover", buttonEventsHandler);
					Z.Utils.removeEventListener(targetBtn, "mousedown", buttonEventsHandler);
					Z.Utils.removeEventListener(targetBtn, "mouseup", buttonEventsHandler);
					Z.Utils.removeEventListener(targetBtn, "mouseout", buttonEventsHandler);
				} else {
					Z.Utils.removeEventListener(targetBtn, "touchstart", buttonEventsHandler);
					Z.Utils.removeEventListener(targetBtn, "touchend", buttonEventsHandler);
					Z.Utils.removeEventListener(targetBtn, "touchcancel", buttonEventsHandler);
				}
			}
		}
	};

	function buttonGraphicsUpdate (event) {
		var target = Z.Utils.target(event);
		if (target) {
			var targetBtn = Z.Utils.target(event).parentNode;
			if (targetBtn) {
				if (!targetBtn._imgUpID) {
					buttonHandlerAndGraphicsReset(targetBtn);
				} else {
					var iU = document.getElementById(targetBtn._imgUpID);
					var iO = document.getElementById(targetBtn._imgOverID);
					var iD = document.getElementById(targetBtn._imgDownID);
					if (iU && iO && iD) {
						var iuS = iU.style;
						var ioS = iO.style;
						var idS = iD.style;
						iuS.visibility = "hidden";
						ioS.visibility = "hidden";
						idS.visibility = "hidden";
						switch (event.type) {
							case "mouseover" :
								ioS.visibility = "visible";
								break;
							case "mousedown" :
								idS.visibility = "visible";
								break;
							case "mousemove" :
								idS.visibility = "visible";
								break;
							case "mouseup" :
								ioS.visibility = "visible";
								break;
							case "mouseout" :
								iuS.visibility = "visible";
								break;
							case "touchstart" :
								idS.visibility = "visible";
								break;
							case "touchend" :
								iuS.visibility = "visible";
								break;
							case "touchcancel" :
								iuS.visibility = "visible";
								break;
						}
					}
				}
			}
		}
	};

	function buttonEventHandlersUpdate (event) {
		var targetBtn = Z.Utils.target(event).parentNode;
		if (targetBtn) {
			var tID = targetBtn.id;
			switch(event.type) {
				case "mouseover" :
					Z.Utils.addEventListener(targetBtn, "mousedown", buttonEventsHandler);
					break;
				case "mousedown" :
					Z.Utils.addEventListener(targetBtn, "mouseup", buttonEventsHandler);
					if (tbViewport) {
						switch (tID) {
							case "buttonMinimize" :
								self.minimize(true);
								Z.Navigator.setVisibility(false);
								break;
							case "buttonExpand" :
								self.minimize(false);
								Z.Navigator.setVisibility(true);
								break;
							case "buttonZoomOut" :
								tbViewport.zoom("out");
								break;
							case "buttonSlider" :
								sliderSlideStart(event);
								sliderMouseMoveHandler(event); // Run once so values are defined at first movement.
								Z.Utils.addEventListener(document, "mousemove", sliderMouseMoveHandler);
								if (!sliderInterval) { sliderInterval = window.setInterval(sliderSlide, SLIDER_TEST_DURATION); }
								Z.Utils.addEventListener(document, "mouseup", buttonEventsHandler);
								break;
							case "trackSlider" :
								sliderSnap(event);
								break;
							case "buttonZoomIn" :
								tbViewport.zoom("in");
								break;
							case "buttonPanLeft" :
								tbViewport.pan("left");
								break;
							case "buttonPanUp" :
								tbViewport.pan("up");
								break;
							case "buttonPanDown" :
								tbViewport.pan("down");
								break;
							case "buttonPanRight" :
								tbViewport.pan("right");
								break;
							case "buttonReset" :
								tbViewport.reset();
								break;
						}
					}
					break;
				case "mouseup" :
					Z.Utils.addEventListener(targetBtn, "mousedown", buttonEventsHandler);
					if (tbViewport) {
						if (tID == "buttonSlider" || buttonSliderDown) {
							if (sliderInterval) {
								window.clearInterval(sliderInterval);
								sliderInterval = null;
							}				
							sliderSlideEnd();			
							Z.Utils.removeEventListener(document, "mousemove", sliderMouseMoveHandler);
							Z.Utils.removeEventListener(document, "mouseup", buttonEventsHandler);
							buttonsAllReset();
						} else if (tID == "buttonZoomOut" || tID == "buttonZoomIn") {
							tbViewport.zoom("stop");
						} else if (tID == "buttonPanLeft" || tID == "buttonPanRight") {
							tbViewport.pan("horizontalStop");
						} else if (tID == "buttonPanUp" || tID == "buttonPanDown") {
							tbViewport.pan("verticalStop");
						} else if (tID == "buttonFullPage") {							
							tbViewport.toggleFullPageView();
						} else if (tID == "buttonEditMode") {
							tbViewport.togglePolygonEditing();
						} else if (tID == "buttonEditDelete") {
							tbViewport.deleteCurrentLabel();
						} else if (tID == "buttonEditCancel") {
							tbViewport.cancelLabelEdits();
						} else if (tID == "buttonEditSave") {
							tbViewport.saveAnnotations();
						}
					}
					break;
				case "mouseout" :
					Z.Utils.addEventListener(targetBtn, "mouseover", buttonEventsHandler);
					if (tbViewport) {
						if (tID == "buttonZoomOut" || tID == "buttonZoomIn") {
							tbViewport.zoom("stop");
						} else if (tID == "buttonPanLeft" || tID == "buttonPanRight") {
							tbViewport.pan("horizontalStop");
						} else if (tID == "buttonPanUp" || tID == "buttonPanDown") {
							tbViewport.pan("verticalStop");
						}
					}
					break;
				case "touchstart" :
					Z.Utils.addEventListener(targetBtn, "touchend", buttonEventsHandler);
					Z.Utils.addEventListener(targetBtn, "touchcancel", buttonEventsHandler);
					if (tbViewport) {
						switch (tID) {
							case "buttonMinimize" :
								self.minimize(true);
								Z.Navigator.setVisibility(false);
								break;
							case "buttonExpand" :
								self.minimize(false);
								Z.Navigator.setVisibility(true);
								break;
							case "buttonZoomOut" :
								tbViewport.zoom("out");
								break;
							case "buttonSlider" :
								sliderSlideStart(event);
								sliderTouchMoveHandler(event); // Run once so values are defined at first movement.
								Z.Utils.addEventListener(document, "touchmove", sliderTouchMoveHandler);
								if (!sliderInterval) { sliderInterval = window.setInterval(sliderSlide, SLIDER_TEST_DURATION); }
								Z.Utils.addEventListener(targetBtn, "touchend", buttonEventsHandler);
								Z.Utils.addEventListener(targetBtn, "touchcancel", buttonEventsHandler);
								break;
							case "trackSlider" :
								sliderSnap(event);
								break;
							case "buttonZoomIn" :
								tbViewport.zoom("in");
								break;
							case "buttonPanLeft" :
								tbViewport.pan("left");
								break;
							case "buttonPanUp" :
								tbViewport.pan("up");
								break;
							case "buttonPanDown" :
								tbViewport.pan("down");
								break;
							case "buttonPanRight" :
								tbViewport.pan("right");
								break;
							case "buttonReset" :
								tbViewport.reset();
								break;
						}
					}
					break;
				case "touchend" :
					Z.Utils.addEventListener(targetBtn, "touchstart", buttonEventsHandler);
					if (tbViewport) {
						if (tID == "buttonZoomOut" || tID == "buttonZoomIn") {
							tbViewport.zoom("stop");
							
							// Optional means to enter basic debugging mode when web page parameter not set.
							if (Z.debug == 0 && tID == "buttonZoomOut" && event.altKey) { Z.Utils.showGlobals(); }
						} else if (tID == "buttonSlider") {
							if (sliderInterval) {
								window.clearInterval(sliderInterval);
								sliderInterval = null;
							}				
							sliderSlideEnd();
							Z.Utils.removeEventListener(document, "touchmove", sliderTouchMoveHandler);
						} else if (tID == "buttonPanLeft" || tID == "buttonPanRight") {
							tbViewport.pan("horizontalStop");
						} else if (tID == "buttonPanUp" || tID == "buttonPanDown") {
							tbViewport.pan("verticalStop");
						} else if (tID == "buttonFullPage") {
							tbViewport.toggleFullPageView();
						} else if (tID == "buttonEditMode") {
							tbViewport.togglePolygonEditing();
						} else if (tID == "buttonEditDelete") {
							tbViewport.deleteCurrentLabel();
						} else if (tID == "buttonEditCancel") {
							tbViewport.cancelLabelEdits();
						} else if (tID == "buttonEditSave") {
							tbViewport.saveAnnotations();
						}
					}
					break;
				case "touchcancel" :
					Z.Utils.addEventListener(targetBtn, "touchstart", buttonEventsHandler);
					if (tbViewport) {
						if (tID == "buttonZoomOut" || tID == "buttonZoomIn") {
							tbViewport.zoom("stop");
							
							// Optional means to enter basic debugging mode when web page parameter not set.
							if (Z.debug == 0 && tID == "buttonZoomOut" && event.altKey) { Z.Utils.showGlobals(); }
						} else if (tID == "buttonSlider") {
							if (sliderInterval) {
								window.clearInterval(sliderInterval);
								sliderInterval = null;
							}				
							sliderSlideEnd();
							Z.Utils.removeEventListener(document, "touchmove", sliderTouchMoveHandler);
						} else if (tID == "buttonPanLeft" || tID == "buttonPanRight") {
							tbViewport.pan("horizontalStop");
						} else if (tID == "buttonPanUp" || tID == "buttonPanDown") {
							tbViewport.pan("verticalStop");
						} else if (tID == "buttonFullPage") {
							tbViewport.toggleFullPageView();
						} else if (tID == "buttonEditMode") {
							tbViewport.togglePolygonEditing();
						} else if (tID == "buttonEditDelete") {
							tbViewport.deleteCurrentLabel();
						} else if (tID == "buttonEditCancel") {
							tbViewport.cancelLabelEdits();
						} else if (tID == "buttonEditSave") {
							tbViewport.saveAnnotations();
						}
					}
					break;
			}
		}
	};
	
	function sliderMouseMoveHandler (event) {
		sliderIntervalMousePt = new Z.Utils.Point(event.clientX, event.clientY); 
	};
	
	function sliderTouchMoveHandler (event) {
		var touch = Z.Utils.getFirstTouch(event);
		if (touch) {
			var target = touch.target;
			sliderIntervalMousePt = new Z.Utils.Point(touch.pageX, touch.pageY);
		}
	};
	
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::: NAVIGATOR FUNCTIONS :::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.ZoomifyNavigator = function (navViewport) {

	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::::: INIT FUNCTIONS :::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	// Declare variables for navigator internal self-reference and initialization completion.
	var self = this;
	var isInitialized = false;
	var validateNavigatorGlobalsInterval;

	// Declare variables for navigator display.
	var nD, ndS, nB, nbS, niC, nicS, nI, nR, nrS;
	var navigatorImage;
		
	// Declare and set variables local to navigator for size and position.
	var navW = Z.navigatorW;
	var navH = Z.navigatorH;
	var navL = Z.navigatorL-1;
	var navT = Z.navigatorT-1;
	var navFit = Z.navigatorFit;
	var navImageW, navImageH = null;
	
	// Load Zoomify Image thumbnail.
	var navigatorBackAlpha = parseFloat(Z.Utils.getResource("DEFAULT_NAVIGATORBACKALPHA"));
	var navigatorImagePath;	
	loadNavigatorImage(initializeNavigator);
	
	function initializeNavigator (tlbrSknArr) {
		// Create navigator display to contain background, image, and rectangle.
		Z.NavigatorDisplay = Z.Utils.createContainerElement("div", "NavigatorDisplay", "inline-block", "absolute", "hidden", navW + "px", navH + "px", navL + "px", navT + "px", "solid", "1px", "transparent none", "0px", "0px", "normal");
		nD = Z.NavigatorDisplay;
		ndS = nD.style;

		// Create background and set transparency.
		var navigatorBackColor = Z.Utils.getResource("DEFAULT_NAVIGATORBACKCOLOR");
		var navigatorBackColorNoAlpha = Z.Utils.getResource("DEFAULT_NAVIGATORBACKCOLORNOALPHA");
		var navigatorBackground = Z.Utils.createContainerElement("div", "navigatorBackground", "inline-block", "absolute", "hidden", navW + "px", navH + "px", "0px", "0px", "none", "0px", navigatorBackColor, "0px", "0px", "normal");
		Z.Utils.setOpacity(navigatorBackground, navigatorBackAlpha, navigatorBackColorNoAlpha);
		Z.NavigatorDisplay.appendChild(navigatorBackground);
		nB = navigatorBackground;
		nbS = nB.style;

		// Add thumbnail image previously loaded.
		var navigatorImageContainer = Z.Utils.createContainerElement("div", "navigatorImageContainer", "inline-block", "absolute", "hidden", navW + "px", navH + "px", "0px", "0px", "none", "0px", "transparent none", "0px", "0px", "normal");
		navigatorImageContainer.appendChild(navigatorImage);
		Z.NavigatorDisplay.appendChild(navigatorImageContainer);
		niC = navigatorImageContainer;
		nicS = niC.style;
		nI = navigatorImage;

		// Create rectangle to indicate position within image of current viewport view.
		var navigatorRectangle = Z.Utils.createContainerElement("div", "navigatorRectangle", "inline-block", "absolute", "hidden", navW+1 + "px", navH+1 + "px", navL + "px", navT + "px", "solid", "1px", "transparent none", "0px", "0px", "normal");
		navigatorRectangle.style.borderColor = Z.Utils.getResource("DEFAULT_NAVIGATORRECTANGLECOLOR");
		Z.NavigatorDisplay.appendChild(navigatorRectangle);
		nR = navigatorRectangle;
		nrS = nR.style;

		// Add navigator to viewer display and set size, position, visibility, and zIndex.
		Z.ViewerDisplay.appendChild(Z.NavigatorDisplay);
		sizeAndPosition(navW, navH, navL, navT, navFit);
		visibility(Z.navigatorVisible == 1 || Z.navigatorVisible == 2);
		moveToFront();

		// Enable mouse, initialize navigator, sync to viewport.
		if (!Z.mobileDevice) {
			// Prevent object dragging and bubbling.
			Z.Utils.addEventListener(nI, "mousedown", Z.Utils.preventDefault);
			Z.Utils.addEventListener(nD, "mousedown", Z.Utils.preventDefault);
			Z.Utils.addEventListener(nD, "mouseover", Z.Utils.stopPropagation)

			Z.Utils.addEventListener(nD, "mousedown", navigatorMouseDownHandler);
		} else {
			Z.Utils.addEventListener(nD, "touchstart", navigatorTouchStartHandler);
			Z.Utils.addEventListener(nD, "touchmove", navigatorTouchMoveHandler);
			Z.Utils.addEventListener(nD, "touchend", navigatorTouchEndHandler);
			Z.Utils.addEventListener(nD, "touchcancel", navigatorTouchCancelHandler);
		}
		// Prevent object context menu.
		Z.Utils.addEventListener(navigatorImage, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.addEventListener(navigatorBackground, "contextmenu", Z.Utils.preventDefault);
		Z.Utils.addEventListener(navigatorRectangle, "contextmenu", Z.Utils.preventDefault);

		setInitialized(true);
		syncToViewport(); // Method also called in drawLayout in sizeAndPosition above but that is prior to full initialization of navigator.
	};
	
	function loadNavigatorImage (successFunction) {
		if (Z.tileSource == "ZoomifyImageFolder") {
			navigatorImagePath = Z.Utils.cacheProofPath(Z.imagePath + "/TileGroup0/" + "0-0-0.jpg");
		} else if (Z.tileSource == "ZoomifyImageFile") {
			navigatorImagePath = Z.Viewport.formatTilePath(0, 0, 0);
		} else if (Z.tileSource == "ImageServer") {
			navigatorImagePath = Z.Viewport.formatTilePath(0, 0, 0);
		}
		navigatorImage = null;
		navigatorImage = new Image();
		navigatorImage.onload = successFunction;
		navigatorImage.onerror = navigatorImageLoadingFailed;
		if (navigatorImagePath != "offsetLoading") {
			navigatorImage.src = navigatorImagePath;
		} else {	
			var navigatorImageTimer = window.setTimeout( function() { loadNavigatorImage(successFunction); }, 100);
		}
	}
	
	this.setImagePath = function (imagePath) {
		niC.removeChild(navigatorImage);
		loadNavigatorImage(reinitializeNavigator);
	};
	
	function reinitializeNavigator (tlbrSknArr) {
		niC.appendChild(navigatorImage);	
		nI = Z.NavigatorDisplay.childNodes[1].firstChild; // Thumbnail.	
		sizeAndPosition(navW, navH, navL, navT, navFit);
		visibility(Z.navigatorVisible == 1 || Z.navigatorVisible == 2);
		moveToFront();	
		syncToViewport();
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::: GET & SET FUNCTIONS :::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	this.getInitialized = function () {
		return getInitialized();
	};

	this.setSizeAndPosition = function (width, height, left, top, fit) {
		if (!fit) { fit = navFit; }
		sizeAndPosition(width, height, left, top, fit);
	};

	this.setVisibility = function (visible) {
		visibility(visible);
	};

	this.syncToViewport = function () {
		syncToViewport();
	};

	this.syncNavigatorRectangleDimensions = function () {
		syncNavigatorRectangleDimensions();
	};

	this.syncNavigatorRectanglePosition = function (currentCenterPt) {
		syncNavigatorRectanglePosition(currentCenterPt);
	};



	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::: CORE FUNCTIONS :::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	this.validateNavigatorGlobals = function () {
		if (getInitialized()) {
			validateNavigatorGlobals();
		} else {
			validateNavigatorGlobalsInterval = window.setInterval(validateNavigatorGlobals, 300);
		}
	};

	function validateNavigatorGlobals () {
		// Ensure synchronizing calls to navigator functions from viewport have access to navigator
		// internal global variables.  First clear any interval used to call this function after initialization.
		if (getInitialized()) {
			if (validateNavigatorGlobalsInterval) {
				window.clearInterval(validateNavigatorGlobalsInterval);
				validateNavigatorGlobalsInterval = null;
			}
			if (!nD || !ndS || !nB || !nbS || !niC || !nicS || !nI || !nR || !nrS) {
				nD = Z.NavigatorDisplay;
				ndS = nD.style;
				nB = Z.NavigatorDisplay.childNodes[0]; // Background.
				nbS = nB.style
				niC = Z.NavigatorDisplay.childNodes[1]; // Image container.
				nicS = niC.style
				nI = Z.NavigatorDisplay.childNodes[1].firstChild; // Thumbnail.
				nR = Z.NavigatorDisplay.childNodes[2]; // Navigation rectangle
				nrS = nR.style;
			}
		}
	};

	function getInitialized () {
		return isInitialized;
	};

	function setInitialized (value) {
		isInitialized = value;
	};

	function sizeAndPosition (width, height, left, top, fit) {
		if (!width) { width = Z.navigatorW; }
		if (!height) { height = Z.navigatorH; }
		if (typeof left === "undefined" || left === null) { left = 0; }
		if (typeof top === "undefined" || top === null) { top = 0; }
		
		if (!nD) { nD = Z.NavigatorDisplay; }
		if (!ndS) { ndS = nD.style; }
		
		// Set navigator image var explicitly in case image is being reset using setImagePath  
		// function to ensure thumbnail size is reset.
		nI = nD.childNodes[1].firstChild; 
		
		if (nD && ndS && nI) {
			// If fitting navigator to aspect ratio of image or viewer calculate and apply aspect
			// ratio to reset navigator dimensions while constraining it within width and height
			// parameters as bounding maximum values.
			if (fit) {
				var navAspect = 1;
				var targetAspect = 1;
				if (fit == 0) {
					targetAspect = Z.viewerW / Z.viewerH;
				} else {
					targetAspect = nI.width / nI.height;
				}
				if (navAspect > 1) {
					height = width;
					height /= targetAspect;
				} else {
					width = height;
					width *= targetAspect;
				}
			}

			// Size navigator.
			ndS.width = width + "px";
			ndS.height = height + "px";

			// Set navigator position.
			ndS.left = (left -1) + "px";
			ndS.top = (top - 1) + "px";

			drawLayout(width, height);
		}
	};

	function drawLayout (width, height) {
		if (!nbS) { nbS = Z.NavigatorDisplay.firstChild.style; } // Background.
		if (!nicS) { nicS = Z.NavigatorDisplay.childNodes[1].style; } // Image container.
		if (!nI) { nI = Z.NavigatorDisplay.childNodes[1].firstChild; } // Thumbnail image.
		if (nbS && nicS && nI) {
			nbS.width = width + "px";
			nbS.height = height + "px";
			setSizeNavigatorImage(width, height, nI.width, nI.height);
			nicS.width = nI.width + "px";
			nicS.height = nI.height + "px";
			nicS.left = ((width - parseFloat(nicS.width)) / 2) + "px";
			nicS.top = ((height - parseFloat(nicS.height)) / 2) + "px";
			syncToViewport();
		}
	};

	function setSizeNavigatorImage (navW, navH, navImgW, navImgH) {
		if (!nI) { nI = Z.NavigatorDisplay.childNodes[1].firstChild; } // Thumbnail image.
		if (nI) {
			var imageAspectRatio = navImgW / navImgH;
			var scaleW = navW / navImgW;
			var scaleH = navH / navImgH;
			var navImageL = 0;
			var navImageT = 0;
			if (scaleW <= scaleH) {
				navImgW = navW;
				navImgH = navW / imageAspectRatio;
				navImageT = ((navH - navImgH * (navW / navImgW)) / 2);
			} else if (scaleH < scaleW) {
				navImgH = navH;
				navImgW = navH * imageAspectRatio;
				navImageL = ((navW - navImgW * (navH / navImgH)) / 2);
			}
			nI.width = navImgW;
			nI.height = navImgH;
		}
	};

	function moveToFront() {
		if (!ndS) { ndS = Z.NavigatorDisplay.style; }
		if (ndS) { ndS.zIndex = ndS.zIndex + 100; }
	};

	function syncToViewport () {
		// Set navigator rectangle size and position.
		if (Z.Viewport && Z.Viewport.getInitialized()) {
			syncNavigatorRectangleDimensions();			
			var currentCenterPt = Z.Viewport.calculateCurrentCenterCoordinates();
			syncNavigatorRectanglePosition(currentCenterPt);
		}
	};

	function visibility (visible) {
		if (!ndS) { ndS = Z.NavigatorDisplay.style; }
		if (ndS) {
			if (visible) {
				ndS.display = "inline-block";
			} else {
				ndS.display = "none";
			}
		}
	};

	function syncNavigatorRectangleDimensions () {
		if (nI && nrS) {
			var scaleW = nI.width / Z.imageW;
			var scaleH = nI.height / Z.imageH;
			var currentZ = Z.Viewport.getZoom();
			var vpScaledW = Z.viewerW * scaleW / currentZ;
			var vpScaledH = Z.viewerH * scaleH / currentZ;
			nrS.width = vpScaledW + "px";
			nrS.height = vpScaledH + "px";
		}
	};

	function syncNavigatorRectanglePosition (cDurrCtrPt) {
		if (nI && nrS && nicS) {
			var scaleW = nI.width / Z.imageW;
			var scaleH = nI.height / Z.imageH;
			var scaledCurrX = cDurrCtrPt.x * scaleW;
			var scaledCurrY = cDurrCtrPt.y * scaleH;
			var navImageCtrX = scaledCurrX - (parseFloat(nrS.width) / 2);
			var navImageCtrY = scaledCurrY - (parseFloat(nrS.height) / 2);
			nrS.left = Math.round(navImageCtrX + parseFloat(nicS.left)) + "px";
			nrS.top = Math.round(navImageCtrY + parseFloat(nicS.top)) + "px";
		}
	};

	function syncViewport () {
		// Calculate navigator rectangle center point and pass to viewport display for sync.
		if (nrS && nicS && nI) {
			var navImageCtrX = parseFloat(nrS.left) - parseFloat(nicS.left) ;
			var navImageCtrY = parseFloat(nrS.top) - parseFloat(nicS.top);
			var scaledCurrX = navImageCtrX + ((parseFloat(nrS.width) - 1) / 2);
			var scaledCurrY = navImageCtrY + ((parseFloat(nrS.height) - 1) / 2);
			var scaleW = Z.imageW / nI.width;
			var scaleH = Z.imageH / nI.height;
			var cDurrX = scaledCurrX * scaleW;
			var cDurrY = scaledCurrY * scaleH;
			Z.Viewport.syncToNavigator(cDurrX, cDurrY);
		}
	};

	function navigatorImageLoadingFailed () {
		Z.Utils.showMessage(Z.Utils.getResource("ERROR_NAVIGATORIMAGEPATHINVALID"));
	};



	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
	//::::::::::::::::::::::::::::::::: EVENT FUNCTIONS ::::::::::::::::::::::::::::::
	//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

	function navigatorMouseDownHandler (event) {
		Z.Viewport.zoomAndPanAllStop();
		if (nD && nR && nrS) {
			var event = Z.Utils.event(event);
			nR.mouseXPrior = event.clientX;
			nR.mouseYPrior = event.clientY;
			dragPtStart = new Z.Utils.Point(event.clientX, event.clientY);
			Z.Utils.addEventListener(nD, "mousemove", navigatorMouseMoveHandler);
			Z.Utils.addEventListener(nD, "mouseup", navigatorMouseUpHandler);
			Z.Utils.addEventListener(document, "mouseup", navigatorMouseUpHandler);
		}
	};

	function navigatorMouseMoveHandler (event) {
		if (nR && nrS) {
			var x = parseFloat(nrS.left);
			var y = parseFloat(nrS.top);
			nrS.left = x + (event.clientX - nR.mouseXPrior) + "px";
			nrS.top = y + (event.clientY - nR.mouseYPrior) + "px";
			nR.mouseXPrior = event.clientX;
			nR.mouseYPrior = event.clientY;
			syncViewport();
			return false;
		}
	};

	function navigatorMouseUpHandler (event) {
		if (nD && nR && nrS) {
			document.mousemove = null;
			document.mouseup = null;
			Z.Utils.removeEventListener(nD, "mousemove", navigatorMouseMoveHandler);
			Z.Utils.removeEventListener(nD, "mouseup", navigatorMouseUpHandler);
			Z.Utils.removeEventListener(document, "mouseup", navigatorMouseUpHandler);
			var event = Z.Utils.event(event);
			var dragPtEnd = new Z.Utils.Point(event.clientX, event.clientY);
			var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
			if (dragDist < 4) {
				var navDispOffsets = Z.Utils.getElementPosition(Z.NavigatorDisplay);
				nrS.left = event.clientX - navDispOffsets.x - (parseFloat(nrS.width) / 2) + "px";
				nrS.top = event.clientY - navDispOffsets.y - (parseFloat(nrS.height) / 2) + "px";
			}
			syncViewport();
			Z.Viewport.updateView();
		}
	};

	function navigatorTouchStartHandler (event) {
		event.preventDefault(); // Prevent copy selection.
		if (nD && nR && nrS) {
			var touch = Z.Utils.getFirstTouch(event);
			if (touch) {
				var target = touch.target;
				var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
				dragPtStart = new Z.Utils.Point(mPt.x, mPt.y);
				nR.mouseXPrior = mPt.x;
				nR.mouseYPrior = mPt.y;
			}
		}
	};

	function navigatorTouchMoveHandler (event) {
		event.preventDefault(); // Prevent page dragging.
		if (!Z.mousePan) { return; }  // Disallow mouse panning if parameter false.

		if (nR && nrS) {
			var touch = Z.Utils.getFirstTouch(event);
			if (touch) {
				var target = touch.target;
				var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
				var x = parseFloat(nrS.left);
				var y = parseFloat(nrS.top);
				nrS.left = x + (mPt.x - nR.mouseXPrior) + "px";
				nrS.top = y + (mPt.y - nR.mouseYPrior) + "px";
				nR.mouseXPrior = mPt.x;
				nR.mouseYPrior = mPt.y;
				syncViewport();
				return false;
			}
		}

		return false;
	};

	function navigatorTouchEndHandler (event) {
		if (nD && nR && nrS) {
			var touch = Z.Utils.getFirstTouch(event);
			if (touch) {
				var target = touch.target;
				var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
				var dragPtEnd = new Z.Utils.Point(mPt.x, mPt.y);
				var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
				var clickThreshold = (!Z.mobileDevice) ? 3 : 6;
				if (dragDist < clickThreshold) {
					var navDispOffsets = Z.Utils.getElementPosition(Z.NavigatorDisplay);
					nrS.left = mPt.x - navDispOffsets.x - (parseFloat(nrS.width) / 2) + "px";
					nrS.top = mPt.y - navDispOffsets.y - (parseFloat(nrS.height) / 2) + "px";
				}
			}
			syncViewport();
			Z.Viewport.updateView();
		}
	};

	function navigatorTouchCancelHandler (event) {
		if (nD && nR && nrS) {
			var touch = Z.Utils.getFirstTouch(event);
			if (touch) {
				var target = touch.target;
				var mPt = new Z.Utils.Point(touch.pageX, touch.pageY);
				var dragPtEnd = new Z.Utils.Point(mPt.x, mPt.y);
				var dragDist = Z.Utils.calculatePointsDistance(dragPtStart.x, dragPtStart.y, dragPtEnd.x, dragPtEnd.y, 2);
				var clickThreshold = (!Z.mobileDevice) ? 3 : 6;
				if (dragDist < clickThreshold) {
					var navDispOffsets = Z.Utils.getElementPosition(Z.NavigatorDisplay);
					nrS.left = mPt.x - navDispOffsets.x - (parseFloat(nrS.width) / 2) + "px";
					nrS.top = mPt.y - navDispOffsets.y - (parseFloat(nrS.height) / 2) + "px";
				}
			}
			syncViewport();
			Z.Viewport.updateView();
		}
	};
};


//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::: NETCONNECTOR FUNCTIONS :::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.NetConnector = function () {
	var imagesLoading = 0;
	var IMAGE_LOAD_TIMEOUT = parseFloat(Z.Utils.getResource("DEFAULT_IMAGELOADTIMEOUT"));
			
	this.loadXML = function (xmlPath) {
		makeNetRequest(xmlPath, receiveResponse, null);
	};
	
	this.postXML = function (xmlPath, postData) {
		makeNetRequest(xmlPath, receiveResponse, postData);
	};

	function makeNetRequest(url, callback, data) {
		var netRequest = null;
		var isAsync = typeof callback === "function";
		if (isAsync) {
			var actual = callback;
			var callback = function () {
				window.setTimeout(Z.Utils.createCallback(null, actual, netRequest), 1);
			};
		}
		if (window.ActiveXObject) {
			var arrActiveX = ["Msxml2.XMLHTTP", "Msxml3.XMLHTTP", "Microsoft.XMLHTTP"];
			for (var i = 0; i < arrActiveX.length; i++) {
				try {
					netRequest = new ActiveXObject(arrActiveX[i]);
					break;
				} catch (e) {
					continue;
				}
			}
		} else if (window.XMLHttpRequest) {
			netRequest = new XMLHttpRequest();
		}
		if (!netRequest) { Z.Utils.showMessage(Z.Utils.getResource("ERROR_XMLHTTPREQUESTUNSUPPORTED")); }
		if (isAsync) {
			netRequest.onreadystatechange = function () {
				if (netRequest.readyState == 4) {
					netRequest.onreadystatechange = new Function ();
					callback();
				}
			};
		}
		
		try {
			if (data === null) {
				netRequest.open("GET", url, isAsync);
				netRequest.send(null);
			} else {
				Z.postingXML = true;
				netRequest.open("POST", url, true);
				
				//Include header information with request.
				netRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				netRequest.setRequestHeader("Content-length", params.length);
				netRequest.setRequestHeader("Connection", "close");
				
				netRequest.send(params);			
			}
		} catch (e) {			
			if (url.indexOf("ImageProperties.xml") != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-IMAGEXML"));
			} else if (url.toUpperCase().indexOf(".PFF") != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-IMAGEHEADER"));
			} else if (url.toUpperCase().indexOf("reply_data") != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-IMAGEOFFSET"));
			} else if (url.indexOf(Z.Utils.getResource("DEFAULT_SKINXMLFILE")) != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-TOOLBARXML"));
			} else if (url.indexOf(Z.Utils.getResource("DEFAULT_HOTSPOTSXMLFILE")) != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-HOTSPOTSXML"));
			} else if (url.indexOf(Z.Utils.getResource("DEFAULT_ANNOTATIONSXMLFILE")) != -1) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-ANNOTATIONSXML"));
			} else if ((url.toUpperCase().indexOf(Z.Utils.getResource("DEFAULT_ANNOTATIONSXMLSAVEHANDLERNAME1")) != -1) || (url.toUpperCase().indexOf(Z.Utils.getResource("DEFAULT_ANNOTATIONSXMLSAVEHANDLERNAME1")) != -1)) {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST-ANNOTATIONSSAVEHANDLER"));
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_MAKINGNETWORKREQUEST"));
			}
			netRequest.onreadystatechange = null;
			netRequest = null;
			// if (isAsync) { callback(); } // Debugging option.
		}
		return isAsync ? null : netRequest;
	};

	function receiveResponse (xhr) {
		if (!xhr) {
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_NETWORKSECURITY"));
		} else if (xhr.status !== 200 && xhr.status !== 0) {
			var status = xhr.status;
			var statusText = (status == 404) ? "Not Found" : xhr.statusText;
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_NETWORKSTATUS") + status + " - " + statusText);
		} else {
			var doc = null;
			if (xhr.responseXML && xhr.responseXML.documentElement) {
				doc = xhr.responseXML;
				validateXML(doc);
			} else if (xhr.responseText) {
				var xmlText = xhr.responseText;
				if (Z.postingXML) {
					Z.postingXML = false;
					Z.Utils.showMessage(Z.Utils.getResource("ALERT_ANNOTATIONSAVESUCCESSFUL"));
					if (Z.Viewport) { Z.Viewport.setAllHotspotsSaved(); }
				} else if (Z.tileSource == "ZoomifyImageFolder") { 
					doc = Z.Utils.convertXMLTextToXMLDoc(xmlText);
					validateXML(doc);	
				} else if (Z.tileSource == "ZoomifyImageFile") { 
					if (xmlText.toUpperCase().indexOf("PFFHEADER") != -1) {
						var dataIndex = xmlText.indexOf("reply_data=") + "reply_data=".length;
						xmlText = xmlText.substring(dataIndex, xmlText.length); 
					} else {
						// Normalize servlet response.
						var beginIndex = xmlText.indexOf("begin=") + "begin=".length;
						var beginEndIndex = xmlText.indexOf("&", beginIndex);						
						beginValue = xmlText.substring(beginIndex, beginEndIndex);						
						var replyDataIndex = xmlText.indexOf("reply_data=") + "reply_data=".length;
						replyDataValue = xmlText.substring(replyDataIndex, xmlText.length); 
						xmlText = '<PFFOFFSET BEGIN="' + beginValue + '" REPLYDATA="' + replyDataValue + '" />'; 
					}
					doc = Z.Utils.convertXMLTextToXMLDoc(xmlText);
					validateXML(doc);			
				} else if (Z.tileSource == "ImageServer") { 
					// Example image server protocol implementation.
					// DEV NOTE: Process image server response here.
				}
			}
		}
	};

	function validateXML (xmlDoc) {
		if (xmlDoc && xmlDoc.documentElement) {
			var rootName = xmlDoc.documentElement.tagName;
			if (rootName == "COPYRIGHT") {
				parseXML("copyright", xmlDoc);
			} else if ((rootName == "IMAGE_PROPERTIES") || (rootName == "PFFHEADER")) {
				parseXML("image", xmlDoc);
			} else if (rootName == "PFFOFFSET") {
				parseXML("offset", xmlDoc);
			} else if (rootName == "SKINDATA") {
				parseXML("skin", xmlDoc);
			} else if (rootName == "DATA") {
				parseXML("hotspots", xmlDoc);
			} else if (rootName == "ZAS") {
				parseXML("annotations", xmlDoc);
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_XMLINVALID"));
			}
		} else {
			Z.Utils.showMessage(Z.Utils.getResource("ERROR_XMLDOCINVALID"));
		}
	};

	function parseXML (xmlType, xmlDoc) {
		if (xmlType == "copyright") {
			// Get text for copyright display.
			var cStatementText = xmlDoc.documentElement.getAttribute("STATEMENTTEXT");
			var cDeclinedText = xmlDoc.documentElement.getAttribute("DECLINEDTEXT");
			if (Z.Utils.isStrVal(cStatementText)) {
				Z.Utils.showCopyright(cStatementText, cDeclinedText);
			} else {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_IMAGEXMLINVALID"));
			}
		} else if (xmlType == "image") {
			// Pass received image properties XML from file, folder, or other tilesource back to Viewer to reenter image loading process.
			if ((Z.tileSource == "ZoomifyImageFolder") || (Z.tileSource == "ZoomifyImageFile") || (Z.tileSource == "ImageServer")) {
				if (Z.Viewport) { Z.Viewport.parseImageXML(xmlDoc); }
			}
		} else if (xmlType == "offset") {
			// Pass received chunk offset data back to Viewer to reenter tile loading process.
			if (Z.Viewport) { Z.Viewport.parseOffsetChunk(xmlDoc); }
		} else if (xmlType == "skin") {
			// Pass received chunk offset data back to Viewer to reenter tile loading process.
			if (Z.Toolbar) { Z.Toolbar.parseSkinXML(xmlDoc); }
		} else if (xmlType == "hotspots") {
			// Pass received hotspot XML back to Viewer to reenter hotspot loading process.
			if (Z.Viewport) { Z.Viewport.parseHotspotsXML(xmlDoc); }
		} else if (xmlType == "annotations") {
			// Pass received annotation XML back to Viewer to reenter annotation loading process.
			if (Z.Viewport) { Z.Viewport.parseAnnotationsXML(xmlDoc); }
		}
	};

	this.loadImage = function (src, callback, content) {
		if (imagesLoading >= parseInt(Z.Utils.getResource("DEFAULT_IMAGESLOADINGMAX"), 10)) { return false; }
		var func = Z.Utils.createCallback(null, onComplete, callback);
		var imageNetRequest = new ImageNetRequest(src, func, content);
		imagesLoading++;
		imageNetRequest.start();
		return true;
	};

	function onComplete(callback, src, img) {
		imagesLoading--;
		if (typeof callback === "function") {
			try {
				callback(img);
			} catch (e) {
				Z.Utils.showMessage(e.name + Z.Utils.getResource("ERROR_EXECUTINGCALLBACK") + src + " " + e.message);
			}
		}
	};

	function ImageNetRequest(src, callback, content) {
		var image = null;
		var timeout = null;
		this.start = function () {
			image = new Image();
			var successFunction = function () { complete(true); };
			var failureFunction = function () { complete(false); };
			
			var timeoutFunc = function () {
				Z.Utils.showMessage(Z.Utils.getResource("ERROR_IMAGEREQUESTTIMEDOUT") + src);
				complete(false);
				
				// Debug option: Use zDebug=2 parameter to display tile request timed out.
				if (Z.debug == 2) { Z.Utils.trace("Image request for " + content + " timeout: " + src); }				
			};
			
			image.onload = successFunction;
			image.onabort = failureFunction;
			image.onerror = failureFunction;
			timeout = window.setTimeout(timeoutFunc, IMAGE_LOAD_TIMEOUT);
			image.src = src;
		};

		function complete(result) {
			image.onload = null;
			image.onabort = null;
			image.onerror = null;
			if (timeout) { window.clearTimeout(timeout); }
			window.setTimeout(function () { callback(src, result ? image : null); }, 1);
		};
	}
};



//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::: UTILITY FUNCTIONS :::::::::::::::::::::::::::::
//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

Z.Utils = {

	declareGlobals : function () {
		// IMAGE & SKIN
		Z.pageContainerID = null;
		Z.imagePath = null;
		Z.skinPath = null;
		Z.skinMode = null;
		Z.parameters = null;

		// PAGE & BROWSER
		Z.browsers = null;
		Z.browser = null;
		Z.browserVersion = null;
		Z.canvasSupported = null;
		Z.cssTransformsSupported = null;
		Z.cssTransformProperty = null;
		Z.cssTransformNoUnits = null;
		Z.alphaSupported = null;
		Z.renderQuality = null;
		Z.mobileDevice = null;

		// VIEWER OPTIONS & DEFAULTS
		Z.initialX = null;
		Z.initialY = null;
		Z.initialZ = null;
		Z.minZ = null;
		Z.maxZ = null;
		Z.zoomSpeed = null;
		Z.panSpeed = null;
		Z.fadeInSpeed = null;
		Z.toolbarVisible = null;
		Z.toolbarW = null;
		Z.toolbarH = null;
		Z.toolbarPosition = null;
		Z.navigatorVisible = null;
		Z.navigatorW = null;
		Z.navigatorH =  null;
		Z.navigatorL = null;
		Z.navigatorT = null;
		Z.navigatorFit = null;
		Z.clickZoom = null;
		Z.clickPan = null;
		Z.mousePan = null;
		Z.keys = null;
		Z.constrainPan = null;
		Z.tooltipsVisible = null;
		Z.watermarkPath = null;
		Z.copyrightPath = null;
		Z.hotspotPath = null;
		Z.hotspotListTitle = null;
		Z.annotationPath = null;
		Z.saveHandlerPath = null;
		Z.postingXML = false;
		Z.sliderVisible = null;
		Z.fullPageVisible = null;
		Z.fullPageInitial = null;		
		Z.progressVisible = null;
		Z.logoVisible = null;
		Z.logoCustomPath = null;
		Z.canvas = null;
		Z.debug = null;
		Z.imageProperties = null;
		Z.serverIP = null;
		Z.serverPort = null;
		Z.tileHandlerPath = null;
		Z.tileHandlerPathFull = null;
		Z.sourceMagnification = null;
		Z.tileSize = null;
		Z.tileSource = null;
		Z.focal = null;
		Z.quality = null;
		Z.editMode = false;
		Z.polygonEditing = false;

		// VIEWER COMPONENTS & STATE VALUES
		Z.Viewer = null;
		Z.ViewerDisplay = null;
		Z.Viewport = null;
		Z.Toolbar = null;
		Z.ToolbarDisplay = null;
		Z.TooltipDisplay = null;
		Z.Navigator = null;
		Z.NavigatorDisplay = null;
		Z.MessageDisplay = null;
		Z.CopyrightDisplay = null;
		Z.AnnotationPanelDisplay = null;
		Z.imageW = null;
		Z.imageH = null;
		Z.imageX = 0;
		Z.imageY = 0;
		Z.imageZ = 0;
		Z.fitZ = null;
		Z.zooming = "stop";
		Z.panningX = "stop";
		Z.panningY = "stop";
		Z.fullPage = false;
		Z.useCanvas = true;
		Z.TraceDisplay = null;
		Z.traces = null;
	},

	enforceCopyright : function () {
		// Test whether copyright has already been presented, and if not, load and display text and require user OK.
		var copyrightCookieExists = this.readCookie('imageCopyright')
		if (copyrightCookieExists) {
			Z.Viewer.configureViewer();
		} else {
			this.loadCopyrightText();
		}
	},

	loadCopyrightText : function () {
		// Load copyright XML for text to display.
		var netConnector = new Z.NetConnector();
		netConnector.loadXML(Z.copyrightPath);
	},

	showCopyright : function (cStateTxt, cDecTxt) {
		// Display copyright text and, if confirmed, create cookie to prevent re-display during the current browser session.
		var scrnColor = this.getResource("DEFAULT_COPYRIGHTSCREENCOLOR");
		var btnColor = this.getResource("DEFAULT_COPYRIGHTBUTTONCOLOR");

		Z.CopyrightDisplay = this.createContainerElement("div", "CopyrightDisplay", "inline-block", "absolute", "hidden", (Z.viewerW - 2) + "px", (Z.viewerH - 2) + "px", "0px", "0px", "solid", "1px", scrnColor, "0px", "0px", "normal");
		Z.ViewerDisplay.appendChild(Z.CopyrightDisplay);
		// Create centered container for text.
		var textBoxW = 440;
		var textBoxH = 200;
		var textBoxLeft = (parseFloat(Z.CopyrightDisplay.style.width) / 2) - (textBoxW / 2);
		var textBoxTop = (parseFloat(Z.CopyrightDisplay.style.height) / 2) - (textBoxH / 2);
		var textBox = this.createContainerElement("div", "textBox", "inline-block", "absolute", "hidden", textBoxW + "px", textBoxH + "px", textBoxLeft + "px", textBoxTop + "px", "none", "0px", "transparent none", "0px", "0px", "normal");
		textBox.id="textBox";
		Z.CopyrightDisplay.appendChild(textBox);

		// Create text node and add text from xml file.
		var copyrightTextNode = document.createTextNode(cStateTxt);
		textBox.appendChild(this.createCenteredElement(copyrightTextNode));
		this.setTextStyle(copyrightTextNode, "black", "verdana", "16px", "none", "normal", "normal", "normal", "normal", "1em", "justify", "none");

		// Add hidden text node to store decline text for Exit condition.
		var declinedTextNode = document.createTextNode(cDecTxt);
		textBox.appendChild(declinedTextNode);

		var btnW = 80;
		var btnH = 20;
		var dvdrW = 30;
		var dvdrH = 20;

		var btnL = textBoxLeft + (textBoxW / 2) - ((btnW * 2 + dvdrW) / 2);
		var btnT = textBoxTop + textBoxH + dvdrH;
		var btnTxt = this.getResource("DEFAULT_COPYRIGHTAGREEBUTTONTEXT");
		var buttonAgree = new Z.Utils.Button("buttonAgree", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", this.copyrightAgreeButtonHandler, "TIP_COPYRIGHTAGREE", "solid", "1px", btnColor, "0px", "0px");
		Z.CopyrightDisplay.appendChild(buttonAgree.elmt);

		btnL += btnW + dvdrW;
		btnTxt = this.getResource("DEFAULT_COPYRIGHTEXITBUTTONTEXT");
		var buttonExit = new Z.Utils.Button("buttonExit", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", this.copyrightExitButtonHandler, "TIP_COPYRIGHTEXIT", "solid", "1px", btnColor, "0px", "0px");
		Z.CopyrightDisplay.appendChild(buttonExit.elmt);
	},

	hideCopyright : function () {
		var textBox = document.getElementById("textBox");

		// Option 1: Change text to remind user they have declined copyright agreement.
		var declinedText = textBox.childNodes[1].nodeValue;
		textBox.firstChild.firstChild.firstChild.firstChild.nodeValue = declinedText;

		// Option 2: remove text field. Combine this with code to leave page or other custom steps.
		// Z.CopyrightDisplay.removeChild(textBox);

		var buttonAgree = document.getElementById("buttonAgree");
		this.removeEventListener(buttonAgree, "mousedown", this.copyrightAgreeButtonHandler);
		Z.CopyrightDisplay.removeChild(buttonAgree);

		var buttonExit = document.getElementById("buttonExit");
		this.removeEventListener(buttonExit, "mousedown", this.copyrightExitButtonHandler);
		Z.CopyrightDisplay.removeChild(buttonExit);	
	},

	copyrightAgreeButtonHandler : function (event) {
		Z.ViewerDisplay.removeChild(Z.CopyrightDisplay);
		document.cookie = 'imageCopyright=confirmed'
		Z.Viewer.configureViewer();
	},

	copyrightExitButtonHandler : function (event) {
		// DEV NOTE: Insert preferred alternative action here, for example return to site Terms Of Use page or homepage.
		Z.Utils.hideCopyright();
		return;
	},

	Button : function (id, label, graphicPath, graphicUp, graphicOver, graphicDown, w, h, x, y, btnEvnt, btnEvntHndlr, tooltipResource, borderStyle, borderWidth, background, margin, padding, whiteSpace, cursor) {
		// Create button element.
		var button = Z.Utils.createContainerElement("span", id, "inline-block", "absolute", "hidden", w, h, x, y, borderStyle, borderWidth, background, margin, padding, whiteSpace, cursor);

		if (!(Z.Utils.isStrVal(label))) {
			// Load images for each button state.
			graphicPath = Z.Utils.removeTrailingSlashCharacters(graphicPath);
			var imgUp = Z.Utils.createGraphicElement(graphicPath + "/" + graphicUp);
			var imgOver = Z.Utils.createGraphicElement(graphicPath + "/" + graphicOver);
			var imgDown = Z.Utils.createGraphicElement(graphicPath + "/" + graphicDown);

			// Create and store button image ids for easy access in event handlers.
			imgUp.id = button.id + "-imgUp";
			imgOver.id = button.id + "-imgOver";
			imgDown.id = button.id + "-imgDown";
			button._imgUpID = imgUp.id;
			button._imgOverID = imgOver.id;
			button._imgDownID = imgDown.id;

			// Size and position button images.
			var iuS = imgUp.style;
			var ioS = imgOver.style;
			var idS = imgDown.style;
			iuS.position = ioS.position = idS.position = "absolute";
			iuS.width = ioS.width = ioS.width =  w;
			iuS.height = ioS.height = ioS.height = h;
			iuS.top = ioS.top = idS.top = "0px";
			iuS.left = ioS.left = idS.left = "0px";
			if (Z.browser == Z.browsers.FIREFOX && Z.browserVersion < 3) { iuS.top = ioS.top = idS.top = ""; }

			// Set default button appearance to Up.
			//iuS.visibility = "visible"; // Commented because explicit visible setting here causes buttons to show initially in CSS layer even before revealed.
			ioS.visibility = "hidden";
			idS.visibility = "hidden";

			// Add images to button.
			button.appendChild(imgUp);
			button.appendChild(imgOver);
			button.appendChild(imgDown);

			// Prevent button dragging and copy menu. No need for this after 'else' clause below
			// because label buttons have no icon images. Note that the approach
			//imgUp.oncontextmenu = Z.Utils.preventDefault; is ineffective on IE.
			Z.Utils.addEventListener(imgUp, "contextmenu", Z.Utils.preventDefault);
			Z.Utils.addEventListener(imgOver, "contextmenu", Z.Utils.preventDefault);
			Z.Utils.addEventListener(imgDown, "contextmenu", Z.Utils.preventDefault);
		} else {
			var textNode = document.createTextNode(label);
			button.appendChild(Z.Utils.createCenteredElement(textNode));
			Z.Utils.setTextStyle(textNode, "black", "verdana", "13px", "none", "normal", "normal", "normal", "normal", "1em", "center", "none");

			// Prevent text selection in button label. No need for this prior to 'else' because
			// standard buttons have no label.
			Z.Utils.disableTextInteraction(textNode);
			Z.Utils.addEventListener(button, "contextmenu", Z.Utils.preventDefault);
		}

		// Set tooltip visibility per optional parameter.
		if (Z.tooltipsVisible && Z.Utils.isStrVal(tooltipResource)) { button.title = Z.Utils.getResource(tooltipResource); }

		if (!Z.mobileDevice) {
		 	// Prevent button dragging and mouseover bubbling.
			Z.Utils.addEventListener(button, "mousedown", Z.Utils.preventDefault);
			Z.Utils.addEventListener(button, "mouseover", Z.Utils.stopPropagation);
			Z.Utils.addEventListener(button, "mouseout", Z.Utils.stopPropagation);

			// Set event handler and element reference.
			Z.Utils.addEventListener(button, btnEvnt, btnEvntHndlr);
		} else {
			// Set event handler - the handler must support mouse and touch contexts.
			Z.Utils.addEventListener(button, "touchstart", btnEvntHndlr);
		}

		this.elmt = button;
	},

	buttonSize : function (targetBtn, w, h) {
		var btnS = targetBtn.style;
		btnS.width = w + "px";
		btnS.height = h + "px";
		var iU = document.getElementById(targetBtn._imgUpID);
		var iO = document.getElementById(targetBtn._imgOverID);
		var iD = document.getElementById(targetBtn._imgDownID);
		if (iU && iO && iD) {
			var iuS = iU.style;
			var ioS = iO.style;
			var idS = iD.style;
			iuS.width = w + "px";
			iuS.height = h + "px";
			ioS.width = w + "px";
			ioS.height = h + "px";
			idS.width = w + "px";
			idS.height = h + "px";
		}
	},

	Graphic : function (id, graphicPath, graphic, w, h, x, y) {
		// Load image for graphic.
		graphicPath = Z.Utils.removeTrailingSlashCharacters(graphicPath);
		var graphicPathFull = (graphic) ? graphicPath + "/" + graphic : graphicPath;
		var img = Z.Utils.createGraphicElement(graphicPathFull);
		var igS = img.style;
		igS.width = w;
		igS.height = h;

		// Create graphic element and add image to it.
		var graphic = Z.Utils.createContainerElement("span", id, "inline-block", "absolute", "hidden", w, h, x, y, "none", "0px", "transparent none", "0px", "0px", "normal");
		graphic.appendChild(img);
		this.elmt = graphic;

		// Prevent graphic dragging and disable context menu.
		if (!Z.mobileDevice) {
			Z.Utils.addEventListener(img, "mousedown", Z.Utils.preventDefault);
		} else {
			Z.Utils.addEventListener(img, "touchstart", Z.Utils.preventDefault);
		}
		Z.Utils.addEventListener(img, "contextmenu", Z.Utils.preventDefault);
	},

	graphicSize : function (targetGphc, w, h) {
			var gS = targetGphc.style;
			gS.width = w + "px";
			gS.height = h + "px";
			var img = targetGphc.firstChild;
			var imgS = img.style;
			imgS.width = w + "px";
			imgS.height = h + "px";
	},

	addCrossBrowserPrototypes : function () {
		// Prototyping is used only to ensure legacy browser versions can support required functions,
		// and is otherwise avoided to limit potential conflicts in the event of code customization.

		if (!Array.prototype.indexOf) {
			Array.prototype.indexOf = function (obj, fromIndex) {
				if (!fromIndex) {
					fromIndex = 0;
				} else if (fromIndex < 0) {
					fromIndex = Math.max(0, this.length + fromIndex);
				}
				for (var i = fromIndex, j = this.length; i < j; i++) {
					if (this[i] === obj)
					return i;
				}
				return -1;
			};
		}

		if (!Array.prototype.indexOfObjectValue) {
			Array.prototype.indexOfObjectValue = function (subobj, obj, fromIndex) {
				if (!fromIndex) {
					fromIndex = 0;
				} else if (fromIndex < 0) {
					fromIndex = Math.max(0, this.length + fromIndex);
				}
				for (var i = fromIndex, j = this.length; i < j; i++) {
					if (this[i][subobj] === obj)
					return i;
				}
				return -1;
			};
		}

		if (!Array.prototype.indexOfObjectValueSubstring) {
			Array.prototype.indexOfObjectValueSubstring = function (subobj, obj, fromIndex) {
				if (!fromIndex) {
					fromIndex = 0;
				} else if (fromIndex < 0) {
					fromIndex = Math.max(0, this.length + fromIndex);
				}
				for (var i = fromIndex, j = this.length; i < j; i++) {
					if (this[i][subobj].indexOf(obj) != -1)
					return i;
				}
				return -1;
			};
		}

		if (!Array.prototype.push) {
			Array.prototype.push = function ( obj ) {
				this[this.length ] = obj;
			}
		}

		if (!Array.prototype.splice) {

			Array.prototype.subarr = function ( iStart, iLength ) {
				if (iStart >= this.length || (iLength && iLength <= 0)) return [];
				else if (iStart < 0) {
					if (Math.abs(iStart) > this.length) iStart = 0;
					else iStart = this.length + iStart;
				}
				if (!iLength || iLength + iStart > this.length) iLength = this.length - iStart;
				var aReturn = [];
				for (var i = iStart; i < iStart + iLength; i++) {
					aReturn.push(this[i]);
				}
				return aReturn;
			}

			Array.prototype.subarray = function ( iIndexA, iIndexB ) {
				if (iIndexA < 0) iIndexA = 0;
				if (!iIndexB || iIndexB > this.length) iIndexB = this.length;
				if (iIndexA == iIndexB) return [];
				var aReturn = [];
				for (var i = iIndexA; i < iIndexB; i++) {
					aReturn.push(this[i]);
				}
				return aReturn;
			}

			Array.prototype.splice = function (iStart, iLength) {
				if (iLength < 0) iLength = 0;
				var aInsert = [];
				if (arguments.length > 2) {
					for (var i = 2, j = arguments.length; i < j; i++) {
						aInsert.push(arguments[i]);
					}
				}
				var aHead = this.subarray(0, iStart);
				var aDelete = this.subarr(iStart, iLength);
				var aTail = this.subarray(iStart + iLength);
				var aNew = aHead.concat(aInsert, aTail);
				this.length = 0;
				for (var i = 0, j = aNew.length; i < j; i++) {
					this.push(aNew[i]);
				}
				return aDelete;
			}
		}
		
		if (!String.prototype.multiply) {
			String.prototype.multiply = (function () {
				var mJoin = Array.prototype.join, mObject = { };
				return function (n) {
					mObject.length = n + 1;
					return mJoin.call(mObject, this);
				}
			})();
		}
	},

	addCrossBrowserMethods : function () {
		// Meta methods are used to ensure consistent functional support.  Specific browser
		// differences are managed within each event handler.
		if (document.addEventListener) {
			// W3C DOM 2 Events model

			this.disableTextInteraction = function (tN) {
				if (tN) {
					tnS = tN.parentNode.style;
					if (tnS) {
						tN.parentNode.unselectable = "on"; // For IE and Opera
						tnS.userSelect = "none";
						tnS.MozUserSelect = "none";
						tnS.webkitUserSelect = "none";
						tnS.webkitTouchCallout = "none";
						tnS.webkitTapHighlightColor = "transparent";
					}
				}
			};

			this.renderQuality = function (image, quality) {
				if (quality) {
					var rndrQuality = (quality == "high") ? "optimizeQuality" : "optimizeSpeed";
					image.style.setProperty ("image-rendering", rndrQuality, null);
				}
			};

			this.setOpacity = function (element, value, altColor) {
				if (Z.alphaSupported) {
					element.style.opacity=value;
				} else if (altColor) {
					element.style.backgroundColor = altColor;
				}
			};

		} else if (document.attachEvent) {
			// Internet Explorer Events model

			this.disableTextInteraction = function (tN) {
				if (tN) {
					tN.parentNode.unselectable = "on"; 
					tN.parentNode.onselectstart = function() { return false; };
				}
			};

			this.renderQuality = function (image, quality) {
				if (quality) {
					var rndrQuality = (quality == "high") ? "bicubic" : "nearest-neighbor";
					image.style.msInterpolationMode = rndrQuality;
				}
			};

			this.setOpacity = function (element, value, altColor) {
				if (Z.alphaSupported) {
					value *= 100; // IE uses range of 1 to 100 rather than 0.1 to 1.
					element.style.zoom = 1; // Workaround to enable alpha support for elements not positioned.
					element.style.filter = "progid:DXImageTransform.Microsoft.Alpha(Opacity=" + value + ")"; // IE8
					element.style.filter = "alpha(opacity=" + value + ")"; // IE7, 6
					
					// Next line is workaround for IE problem with overwriting right and bottom borders of div where
					// overflow is set to "hidden" but content's filter is set to value=100 in the two filter lines above.
					if (value == 100) { element.style.filter = ""; }
					
				} else if (altColor) {
					element.style.backgroundColor = altColor;
				}
			};
		}
	},

	addCrossBrowserEvents : function () {
		// Meta events model is used only to ensure consistent event listener methods.
		// Specific browser differences are managed within each event handler.
		if (document.addEventListener) {
			// W3C DOM 2 Events model

			this.addEventListener = function (target, eventName, handler) {
				if (eventName == "mousewheel") { elmt.addEventListener("DOMMouseScroll", handler, false); }
				target.addEventListener(eventName, handler, false);
			};

			this.removeEventListener = function (target, eventName, handler) {
				if (eventName == "mousewheel") { elmt.addEventListener("DOMMouseScroll", handler, false); }
				if (target) { target.removeEventListener(eventName, handler, false); }
			};

			this.event = function (event) {
				return event;
			};

			this.target =  function (event) {
				return event.target;
			};

			this.relatedTarget = function (event) {
				return event.relatedTarget;
			};

			this.isRightMouseButton = function (event) {
				var rightButton = false;
				if (event.which == 2 || event.which == 3) { rightButton = true; }
				return rightButton;
			};

			this.preventDefault = function (event) {
				event.preventDefault();
			};

			this.stopPropagation = function (event) {
				event.stopPropagation();
			};

		} else if (document.attachEvent) {
			// Internet Explorer Events model

			this.addEventListener = function (target, eventName, handler) {
				if (this._findListener(target, eventName, handler) != -1) return; // Prevent redundant listeners (DOM 2).
				var handler2 = function () {
					// IE version-specific listener (method of target, event object global)
					var event = window.event;
					if (Function.prototype.call) {
						handler.call(target, event);
					} else {
						target._currentListener = handler;
						target._currentListener(event)
						target._currentListener = null;
					}
				};
				target.attachEvent("on" + eventName, handler2);
				// Object supports cleanup
				var listenerRecord = {
					target: target,
					eventName: eventName,
					handler: handler,
					handler2: handler2
				};
				var targetDoc = target.document || target; // Get window object reference containing target.
				var targetWin = targetDoc.parentWindow;
				var listenerId = "l" + this._listenerCounter++; // Create unique ID
				if (!targetWin._allListeners) { targetWin._allListeners = {}; } // Record listener in window object.
				targetWin._allListeners[listenerId] = listenerRecord;
				if (!target._listeners) { target._listeners = []; } // Record listener ID in target.
				target._listeners[target._listeners.length] = listenerId;
				if (!targetWin._unloadListenerAdded) {
					targetWin._unloadListenerAdded = true;
					targetWin.attachEvent("onunload", this._removeAllListeners); // Ensure listener cleanup on unload.
				}
			};

			this.removeEventListener = function (target, eventName, handler) {
				if (target) {
					var listenerIndex = this._findListener(target, eventName, handler); // Verify listener added to target.
					if (listenerIndex == -1) { return; }
					var targetDoc = target.document || target; // Get window object reference containing target.
					var targetWin = targetDoc.parentWindow;
					var listenerId = target._listeners[listenerIndex]; // Get listener in window object.
					var listenerRecord = targetWin._allListeners[listenerId];
					target.detachEvent("on" + eventName, listenerRecord.handler2); // Remove listener. Remove ID from target.
					target._listeners.splice(listenerIndex, 1);
					delete targetWin._allListeners[listenerId]; // Remove listener record from window object.
				}
			};

			this.event = function (event) {
				return window.event;
			};

			this.target =  function (event) {
				return event.srcElement;
			};

			this.relatedTarget = function (event) {
				var relTarg = null;
				if (event.type == "mouseover") {
					relTarg = event.fromElement;
				} else if (event.type == "mouseout") {
					relTarg = event.toElement;
				}
				return relTarg;
			};

			this.isRightMouseButton = function (event) {
				var rightButton = false;
				if (event.button == 2) { rightButton = true; }
				return rightButton;
			};

			this.preventDefault = function (event) {
				if (event) { event.returnValue = false; }
			};

			this.stopPropagation = function (event) {
				event.cancelBubble = true;
			};

			this._findListener = function (target, eventName, handler) {
				var listeners = target._listeners; // Get array of listener IDs added to target.
				if (!listeners) { return -1; }
				var targetDoc = target.document || target; // Get window object reference containing target.
				var targetWin = targetDoc.parentWindow;
				for (var i = listeners.length - 1; i >= 0; i--) {
					// Find listener (backward search for faster onunload).
					var listenerId = listeners[i]; // Get listener's ID from target.
					var listenerRecord = targetWin._allListeners[listenerId]; // Get listener record from window object.
					// Compare eventName and handler with the retrieved record
					if (listenerRecord.eventName == eventName && listenerRecord.handler == handler) { return i; }
				}
				return -1;
			};

			this._removeAllListeners = function () {
				var targetWin = this;
				for (id in targetWin._allListeners) {
					var listenerRecord = targetWin._allListeners[id];
					listenerRecord.target.detachEvent("on" + listenerRecord.eventName, listenerRecord.handler2);
					delete targetWin._allListeners[id];
				}
			};

			this._listenerCounter = 0;
		}
	},

	detectBrowserInfo : function () {
		Z.browsers = { UNKNOWN: 0, IE: 1, FIREFOX: 2, SAFARI: 3, CHROME: 4, OPERA: 5 };
		var browser = Z.browsers.UNKNOWN;
		var browserVersion = 0;
		var app = navigator.appName;
		var ver = navigator.appVersion;
		var msInterpolationMode = false;
		var gwkRenderingMode = false;
		var ua = navigator.userAgent.toLowerCase();

		if (app == "Microsoft Internet Explorer" && !! window.attachEvent && !! window.ActiveXObject) {
			var ieOffset = ua.indexOf("msie");
			browser = Z.browsers.IE;
			browserVersion = parseFloat(ua.substring(ieOffset + 5, ua.indexOf(";", ieOffset)));
			msInterpolationMode = (typeof document.documentMode !== "undefined");
		} else if (app == "Netscape" && !! window.addEventListener) {
			var idxFF = ua.indexOf("firefox");
			var idxSA = ua.indexOf("safari");
			var idxCH = ua.indexOf("chrome");
			if (idxFF >= 0) {
				browser = Z.browsers.FIREFOX;
				browserVersion = parseFloat(ua.substring(idxFF + 8));
			} else if (idxSA >= 0) {
				var slash = ua.substring(0, idxSA).lastIndexOf("/");
				browser = (idxCH >= 0) ? Z.browsers.CHROME : Z.browsers.SAFARI;
				browserVersion = parseFloat(ua.substring(slash + 1, idxSA));
			}
			var testImage = new Image();
			if (testImage.style.getPropertyValue) { gwkRenderingMode = testImage.style.getPropertyValue ("image-rendering"); }
		} else if (app == "Opera" && !! window.opera && !! window.attachEvent) {
			browser = Z.browsers.OPERA;
			browserVersion = parseFloat(ver);
		}

		var docElmt = document.documentElement || {};
		var docElmtStyle = docElmt.style || {};
		var cssTransformsSupported = false;
		var cssTransformProperties = ["transform", "WebkitTransform", "MozTransform"];
		var cssTransformProperty;
		var cssTransformNoUnits;
		while (cssTransformProperty = cssTransformProperties.shift()) {
			if (typeof docElmtStyle[cssTransformProperty] !== "undefined") {
				cssTransformsSupported = true;
				cssTransformNoUnits = /webkit/i.test(cssTransformProperty);
				break;
			}
		}

		var canvasSupportPresent = ((document.createElement("canvas").getContext) && (document.createElement("canvas").getContext("2d")));
		var canvasSuppSubpix = !((browser == Z.browsers.SAFARI && browserVersion < 4) || (browser == Z.browsers.CHROME && browserVersion < 2));
		var canvasSupported = canvasSupportPresent && canvasSuppSubpix;
		var alphaSupported = !(browser == Z.browsers.CHROME && browserVersion < 2);
		var renderQuality = (msInterpolationMode || gwkRenderingMode) ? "high" : null;
		
		// Detect browsing on device without mouse and therefore withoug mouse-over state for toolbar show/hide feature.
		var mobileDevice = (ua.indexOf("android") > -1 || ua.indexOf("iphone") > -1 || ua.indexOf("ipad") > -1 || ua.indexOf("ipod") > -1);

		Z.browser = browser;
		Z.browserVersion = browserVersion;
		Z.canvasSupported = canvasSupported;
		Z.useCanvas = Z.canvasSupported;  // Can be overridden by false zCanvas parameter.
		Z.cssTransformsSupported = cssTransformsSupported;
		Z.cssTransformProperty = cssTransformProperty;
		Z.cssTransformNoUnits = cssTransformNoUnits;
		Z.alphaSupported = alphaSupported;
		Z.renderQuality = renderQuality;
		Z.mobileDevice = mobileDevice;
	},

	isStrVal : function (value) {
		return (value != null && value != "" && value != "null"); // Final check for 'null' string value added for XML uses.
	},
	
	getCurrentUTCDateAsString : function () {
		var date = new Date();
		var month = ((date.getUTCMonth() + 1 < 10) ? "0" : "") + (date.getUTCMonth() + 1);
		var day = ((date.getUTCDate() < 10) ? "0" : "") + date.getUTCDate();
		var hour = ((date.getUTCHours() < 10) ? "0" : "") + date.getUTCHours();
		var minute = ((date.getUTCMinutes() < 10) ? "0" : "") + date.getUTCMinutes();
		var second = ((date.getUTCSeconds() < 10) ? "0" : "") + date.getUTCSeconds();
		return date.getUTCFullYear() + month + day + hour + minute + second;
	},	

	getElementPosition : function (elmt) {
		var left = 0;
		var top = 0;
		var isFixed = this.getElementStyle(elmt).position == "fixed";
		var offsetParent = this.getOffsetParent(elmt, isFixed);
		while (offsetParent) {
			left += elmt.offsetLeft;
			top += elmt.offsetTop;
			if (isFixed) {
				var psPt = this.getPageScroll();
				left += psPt.x;
				top += psPt.y;
			}
			elmt = offsetParent;
			isFixed = this.getElementStyle(elmt).position == "fixed";
			offsetParent = this.getOffsetParent(elmt, isFixed);
		}
		return new this.Point(left, top);
	},

	getOffsetParent : function (elmt, isFixed) {
		if (isFixed && elmt != document.body) {
			return document.body;
		} else {
			return elmt.offsetParent;
		}
	},

	getElementSize : function (elmt) {
		return new this.Point(elmt.clientWidth, elmt.clientHeight);
	},

	getElementStyle : function (elmt) {
		if (elmt.currentStyle) {
			return elmt.currentStyle;
		} else if (window.getComputedStyle) {
			return window.getComputedStyle(elmt, "");
		} else {
			this.showMessage(this.getResource("ERROR_UNKNOWNELEMENTSTYLE"));
		}
	},
	
	getElementStyleProperty : function (elmt, styleProp) {
		if (elmt.currentStyle) {
			return elmt.currentStyle[styleProp];
		} else if (window.getComputedStyle) {
			return document.defaultView.getComputedStyle(elmt, null).getPropertyValue(styleProp);
		} else {
			this.showMessage(this.getResource("ERROR_UNKNOWNELEMENTSTYLE"));
		}
	},

	getEventTargetCoords : function (event) {
		return getElementPosition(Z.Utils.target(event));
	},
	
	getFirstTouch : function (event) {
		var firstTouch = null; 
		var touches = event.touches;
		var changed = event.changedTouches;
		if (touches !== undefined) { 
			firstTouch = touches[0]; 
		} else if (changed !== undefined) {
			firstTouch = changed[0]; 		
		}
		return firstTouch;
	},

	getMousePosition : function (event) {
		var x = 0;
		var y = 0;
		if (event.type == "DOMMouseScroll" && browser == Browser.FIREFOX && browserVersion < 3) {
			x = event.screenX;
			y = event.screenY;
		} else if (typeof event.pageX === "number") {
			x = event.pageX;
			y = event.pageY;
		} else if (typeof event.clientX === "number") {
			x = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = event.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		} else {
			this.showMessage(this.getResource("ERROR_UNKNOWNMOUSEPOSITION"));
		}
		return new this.Point(x, y);
	},

	getMouseScroll : function (event) {
		var delta = 0;
		if (typeof event.wheelDelta === "number") {
			delta = event.wheelDelta;
		} else if (typeof event.detail === "number") {
			delta = event.detail * -1;
		} else {
			this.showMessage(this.getResource("ERROR_UNKNOWNMOUSESCROLL"));
		}
		return delta ? delta / Math.abs(delta) : 0;
	},

	getPageScroll : function () {
		var x = 0;
		var y = 0;
		var docElmt = document.documentElement || {};
		var body = document.body || {};
		if (typeof window.pageXOffset === "number") {
			x = window.pageXOffset;
			y = window.pageYOffset;
		} else if (body.scrollLeft || body.scrollTop) {
			x = body.scrollLeft;
			y = body.scrollTop;
		} else if (docElmt.scrollLeft || docElmt.scrollTop) {
			x = docElmt.scrollLeft;
			y = docElmt.scrollTop;
		}
		return new this.Point(x, y);
	},

	getWindowSize : function () {
		var x = 0;
		var y = 0;
		var docElmt = document.documentElement || {};
		var body = document.body || {};
		if (typeof window.innerWidth === 'number') {
			x = window.innerWidth;
			y = window.innerHeight;
		} else if (docElmt.clientWidth || docElmt.clientHeight) {
			x = docElmt.clientWidth;
			y = docElmt.clientHeight;
		} else if (body.clientWidth || body.clientHeight) {
			x = body.clientWidth;
			y = body.clientHeight;
		} else {
			this.showMessage(this.getResource("ERROR_UNKNOWNWINDOWSIZE"));
		}
		return new this.Point(x, y);
	},

	nodeIsInViewer : function (nodeToTest) {
		var isInViewer = false;
		var ancestor = nodeToTest;
		while (isInViewer == false) {
			if (ancestor) {
				if (ancestor.id) {
					if (ancestor.id == "ViewerDisplay") {
						isInViewer = true;
					} else {
						ancestor = ancestor.parentNode;
					}
				} else {
					ancestor = ancestor.parentNode;
				}
			} else {
				break;
			}
		}
		return isInViewer;
	},

	readCookie : function (name) {
		var nameEq = name + "=";
		var nameValuePairs = document.cookie.split(';');
		for (var i = 0;i < nameValuePairs.length;i++) {
			var nvP = nameValuePairs[i];
			while (nvP.charAt(0) == ' ') { nvP = nvP.substring(1,nvP.length); }
			if (nvP.indexOf(nameEq) == 0) { return nvP.substring(nameEq.length,nvP.length); }
		}
		return null;
	},

	removeTrailingSlashCharacters : function (stringToClean) {
		var stringCleaned = (stringToClean.slice(-1, stringToClean.length) == '/') ? stringToClean.slice(0, stringToClean.length-1) : stringToClean;
		// Next line removed to allow for leading slash signifying root context.
		//stringCleaned = (stringToClean.slice(0, 1) == '/') ? stringToClean.slice(1, stringToClean.length) : stringToClean;
		return stringCleaned;
	},		
	
	cacheProofPath : function (url) {
		// Apply to support setImagePath feature, non-caching implementations, and to avoid IE problem leading to correct image with wrong dimensions. (DEV NOTE: Formerly limited to Z.browser == Z.browsers.IE)
		url += "?noCacheSfx=" + new Date().getTime().toString();
		return url;
	},

	easing : function (b, t, c, d) {
		// Key: b=start, t=target, c=current time, d=duration, calculated s = span (quintic transition)
		var s = t - b;
		if ((c /= d / 2) < 1) {
			return s / 2 * c * c * c * c * c + b;
		} else {
			return s / 2 * ((c -= 2) * c * c * c * c + 2) + b;
		}
	},

	parseParameters : function (paramsString) {
		var parsedParams;
		if (paramsString) { parsedParams = paramsString.split('&'); }
		return parsedParams;
	},

	setParameters : function (params) { 
		var paramsEnableTest = this.getResource("DEFAULT_PARAMETERSENABLETEST");
		var paramsDisableValue = this.getResource("DEFAULT_PARAMETERSDISABLEVALUE");
		var paramsDisabledAlert = this.getResource("DEFAULT_PARAMETERSDISABLEDALERT");
		
		var specialStorageEnableTest = this.getResource("DEFAULT_SPECIALSTORAGESUPPORTENABLETEST");
		var specialStorageDisableValue = this.getResource("DEFAULT_SPECIALSTORAGESUPPORTDISABLEVALUE");
		var specialStorageDisabledAlert = this.getResource("DEFAULT_SPECIALSTORAGESUPPORTDISABLEDALERT");
		var specialStorageEnabled = (specialStorageEnableTest != specialStorageDisableValue) ? true : false;
		
		var annotationsEnabledTest = this.getResource("DEFAULT_ANNOTATIONSUPPORTENABLETEST");
		var annotationsDisableValue = this.getResource("DEFAULT_ANNOTATIONSUPPORTDISABLEVALUE");
		var annotationsDisabledAlert = this.getResource("DEFAULT_ANNOTATIONSUPPORTDISABLEDALERT");
		var annotationsEnabled = (annotationsEnabledTest != annotationsDisableValue) ? true : false;
		
		Z.skinPath = this.getResource("DEFAULT_SKINXMLPATH");
		Z.skinMode = this.getResource("DEFAULT_SKINMODE");
		if (!isNaN(parseFloat(this.getResource("DEFAULT_INITIALX")))) { Z.initialX = parseFloat(this.getResource("DEFAULT_INITIALX")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_INITIALY")))) { Z.initialY = parseFloat(this.getResource("DEFAULT_INITIALY")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_INITIALZOOM")))) { Z.initialZ = parseFloat(this.getResource("DEFAULT_INITIALZOOM")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_MINZOOM")))) { Z.minZ = parseFloat(this.getResource("DEFAULT_MINZOOM")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_MAXZOOM")))) { Z.maxZ = parseFloat(this.getResource("DEFAULT_MAXZOOM")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_ZOOMSPEED")))) { Z.zoomSpeed = parseFloat(this.getResource("DEFAULT_ZOOMSPEED")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_PANSPEED")))) { Z.panSpeed = parseFloat(this.getResource("DEFAULT_PANSPEED")); }
		if (!isNaN(parseFloat(this.getResource("DEFAULT_FADEINSPEED")))) { Z.fadeInSpeed = parseFloat(this.getResource("DEFAULT_FADEINSPEED")); }
		Z.toolbarVisible = parseInt(this.getResource("DEFAULT_TOOLBARVISIBLE"), 10);
		Z.toolbarPosition = parseFloat(this.getResource("DEFAULT_TOOLBARPOSITION"));
		Z.tooltipsVisible = (this.getResource("DEFAULT_TOOLTIPSVISIBLE") != "0");
		Z.navigatorVisible = parseInt(this.getResource("DEFAULT_NAVIGATORVISIBLE"), 10);
		Z.navigatorW = parseInt(this.getResource("DEFAULT_NAVIGATORWIDTH"), 10);
		Z.navigatorH = parseInt(this.getResource("DEFAULT_NAVIGATORHEIGHT"), 10);
		Z.navigatorL = parseInt(this.getResource("DEFAULT_NAVIGATORLEFT"), 10);
		Z.navigatorT = parseInt(this.getResource("DEFAULT_NAVIGATORTOP"), 10);
		Z.navigatorFit = this.getResource("DEFAULT_NAVIGATORFIT");
		Z.clickZoom = (this.getResource("DEFAULT_CLICKZOOM") != "0");
		Z.clickPan = (this.getResource("DEFAULT_CLICKPAN") != "0");
		Z.mousePan = (this.getResource("DEFAULT_MOUSEPAN") != "0");
		Z.keys = (this.getResource("DEFAULT_KEYS") != "0");
		Z.constrainPan = (this.getResource("DEFAULT_CONSTRAINPAN") != "0");
		Z.sliderVisible = (this.getResource("DEFAULT_SLIDERVISIBLE") != "0");
		Z.fullPageVisible = (this.getResource("DEFAULT_FULLPAGEVISIBLE") != "0");
		Z.fullPageInitial = (this.getResource("DEFAULT_FULLPAGEINITIAL") != "0");
		Z.progressVisible = (this.getResource("DEFAULT_PROGRESSVISIBLE") != "0");
		Z.logoVisible = (this.getResource("DEFAULT_LOGOVISIBLE") != "0");
		Z.logoCustomPath = this.getResource("DEFAULT_LOGOCUSTOMPATH");
		Z.canvas = (this.getResource("DEFAULT_CANVAS") != "0");
		Z.debug = parseInt(this.getResource("DEFAULT_DEBUG"), 10);
		Z.focal = parseInt(this.getResource("DEFAULT_FOCAL"), 10);
		Z.quality = parseInt(this.getResource("DEFAULT_QUALITY"), 10);

		if (this.isStrVal(params)) {
			for (var i = 0, j = params.length; i < j; i++) {
				var nameValuePair = params[i];
				var sep = nameValuePair.indexOf('=');
				if (sep > 0) {
					var pName = nameValuePair.substring(0, sep)
					var pValue = nameValuePair.substring(sep + 1)
					if (this.isStrVal(pValue)) {
						switch (pName) {
							case "zInitialX" : // Default is null (centered).
								if (!isNaN(parseFloat(pValue))) { Z.initialX = parseFloat(pValue); }
								break;
							case "zInitialY" : // Default is null (centered).
								if (!isNaN(parseFloat(pValue))) { Z.initialY = parseFloat(pValue); }
								break;
							case "zInitialZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is null (zoom-to-fit view area).
								if (!isNaN(parseFloat(pValue))) {
									Z.initialZ = parseFloat(pValue);
									if (Z.initialZ) { Z.initialZ /= 100; }
								}
								break;
							case "zMinZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is null (zoom-to-fit view area).
								if (!isNaN(parseFloat(pValue)) && parseFloat(pValue) > 0.01) {
									Z.minZ = parseFloat(pValue);
									if (Z.minZ) { Z.minZ /= 100; }
								}
								break;
							case "zMaxZoom" : // "1" to "100" recommended range (internally 0.1 to 1), default is 1 (100%).
								if (!isNaN(parseFloat(pValue))) {
									Z.maxZ = parseFloat(pValue);
									if (Z.maxZ) { Z.maxZ /= 100; }
								}
								break;							
							case "zNavigatorVisible" :  // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
								Z.navigatorVisible = parseInt(pValue, 10);
								break;
							case "zToolbarVisible" :  // "0"=hide, "1"=show, "-1"=show/hide (default), "-2"=hide/show.
								Z.toolbarVisible = parseInt(pValue, 10);
								break;
							case "zLogoVisible" :  // "0"=hide, "1"=show (default).
								if (pValue == "0") { Z.logoVisible = false; }
								break;
							case "zSliderVisible" :  // "0"=false, "1"=true (default).
								if (pValue == "0") { Z.sliderVisible = false; }
								break;
							case "zFullPageVisible" :  // "0"=false, "1"=true (default).
								if (pValue == "0") { Z.fullPageVisible = false; }
								break;
							case "zFullPageInitial" :  // "0"=false, "1"=true (default).
								if (pValue == "1") { Z.fullPageInitial = true; }
								break;
							case "zProgressVisible" :  // "0"=false, "1"=true (default).
								if (pValue == "0") { Z.progressVisible = false; }
								break;
							case "zTooltipsVisible" :  // "0"=hide, "1"=show (default).
								if (pValue == "0") { Z.tooltipsVisible = false; }
								break;			
							case "zSkinPath" :
								Z.skinPath = pValue;
								break;
							default :
								if (paramsEnableTest == paramsDisableValue) {
									alert(paramsDisabledAlert + " " +pName);
								} else {
									switch (pName) {
										case "zZoomSpeed" : // "1"=slow to "10"=fast, default is "5".
											Z.zoomSpeed = parseInt(pValue, 10);
											break;
										case "zPanSpeed" :  // "1"=slow to "10"=fast, default is "5".
											Z.panSpeed = parseInt(pValue, 10);
											break;
										case "zFadeInSpeed" : // "1"=slow to "10"=fast, default is "5", "0" = no fade-in.
											Z.fadeInSpeed = parseInt(pValue, 10);
											break;
										case "zToolbarPosition" :  // "0"=top, "1"=bottom (default).
											Z.toolbarPosition = parseInt(pValue, 10);
											break;
										case "zNavigatorWidth" : // Size in pixels, default is 150, useful max is thumbnail width.
											if (!isNaN(parseFloat(pValue))) { Z.navigatorW = parseFloat(pValue); }
											break;
										case "zNavigatorHeight" : // Size in pixels, default is 150, useful max is thumbnail height.
											if (!isNaN(parseFloat(pValue))) { Z.navigatorH = parseFloat(pValue); }
											break;
										case "zNavigatorLeft" : // Position in pixels, default is 0.
											if (!isNaN(parseFloat(pValue))) { Z.navigatorL = parseFloat(pValue); }
											break;
										case "zNavigatorTop" : // Position in pixels, default is 0.
											if (!isNaN(parseFloat(pValue))) { Z.navigatorT = parseFloat(pValue); }
											break;
										case "zNavigatorFit" :  // "0"= fit to viewer (default), "1"= fit to image.
											if (!isNaN(parseFloat(pValue))) { Z.navigatorFit = parseInt(pValue, 10); }
											break;
										case "zClickZoom" :  // "0"=disable, "1"=enable (default).
											if (pValue == "0") { Z.clickZoom = false; }
											break;
										case "zClickPan" :  // "0"=disable, "1"=enable (default).
											if (pValue == "0") { Z.clickPan = false; }
											break;
										case "zMousePan" :  // "0"=disable, "1"=enable (default).
											if (pValue == "0") { Z.mousePan = false; }
											break;
										case "zKeys" :  // "0"=disable, "1"=enable (default).
											if (pValue == "0") { Z.keys = false; }
											break;
										case "zConstrainPan" :  // "0"=false, "1"=true.
											if (pValue == "0") { Z.constrainPan = false; }
											break;
										case "zWatermarkPath" :
											Z.watermarkPath = pValue;
											break;
										case "zCopyrightPath" :
											Z.copyrightPath = pValue;
											break;									
										case "zHotspotPath" :
											Z.hotspotPath = pValue;
											break;											
										case "zHotspotListTitle" :
											Z.hotspotListTitle = pValue;
											break;							
										case "zAnnotationPath" :
											Z.annotationPath = pValue;
											break;	
										case "zLogoCustomPath" :
											Z.logoCustomPath = pValue;
											break;
										case "zCanvas" :  // "0"=false, "1"=true (default).
											if (pValue == "0") { Z.canvas = false; }
											// Use canvas if supported by browser and not disabled by parameter.
											if (!Z.canvasSupported || !Z.canvas) { Z.useCanvas = false; }
											break;
										case "zDebug" :  // "0"=disable (default), "1"=enable, "2"=enable with tile name labels and tracing.
											Z.debug = parseInt(pValue, 10);
											break;
										case "zImageProperties" :
											Z.imageProperties = pValue;
											break;
										case "zServerIP" :
											Z.serverIP = pValue;
											break;
										case "zServerPort" :
											Z.serverPort = pValue;
											break;
										case "zTileHandlerPath" :
											Z.tileHandlerPath = pValue;
											break;	
										case "zEditMode" :
											Z.editMode = pValue;
											break;												
										case "zSaveHandlerPath" :
											Z.saveHandlerPath = pValue;
											break;											
										case "zImageW" :
											Z.imageW = parseInt(pValue, 10);
											break;												
										case "zImageH" :
											Z.imageH = parseInt(pValue, 10);
											break;												
										case "zTileSize" :
											Z.tileSize = parseInt(pValue, 10);
											break;												
										case "zMagnification" :
											Z.sourceMagnification = parseInt(pValue, 10);
											break;											
										case "zFocal" :
											Z.focal = parseInt(pValue, 10);
											break;											
										case "zQuality" :
											Z.quality = parseInt(pValue, 10);
											break;
									}
								
								}
								break;
						}
					}
				}
			}
		}
		if (!Z.Utils.isStrVal(Z.tileHandlerPath)) {
			Z.tileSource = "ZoomifyImageFolder";
		} else if (Z.imagePath.toLowerCase().indexOf(".pff") != -1) {
			if (specialStorageEnabled) {
				Z.tileSource = "ZoomifyImageFile";

				// Build full tile handler path.
				var tHPF = Z.tileHandlerPath;

				// DEV NOTE: JavaScript cross-domain block conflicts with specifying server IP and port.
				//if (tHPF.substr(0,1) != "/") { tHPF = "/" + tHPF; }
				//if (Z.serverPort != "80") { tHPF = ":" + Z.serverPort + tHPF; }
				//tHPF = Z.serverIP + tHPF;

				Z.tileHandlerPathFull = tHPF;
			} else {
				alert(specialStorageDisabledAlert); 
			}
		} else if (Z.Utils.isStrVal(Z.tileHandlerPath)) {
			if (specialStorageEnabled) {			
				 // Example image server protocol implementation.
				Z.tileSource = "ImageServer";
				
				// Build full tile handler path.
				var tHPF = Z.tileHandlerPath;

				// DEV NOTE: JavaScript cross-domain block conflicts with specifying server IP and port.
				//if (tHPF.substr(0,1) != "/") { tHPF = "/" + tHPF; }
				//if (Z.serverPort != "80") { tHPF = ":" + Z.serverPort + tHPF; }
				//tHPF = Z.serverIP + tHPF;

				Z.tileHandlerPathFull = tHPF;
			} else {
				alert(specialStorageDisabledAlert); 
			}
		}
		if (Z.Utils.isStrVal(Z.annotationPath) || Z.Utils.isStrVal(Z.saveHandlerPath)) {
			if (annotationsEnabled) {
				if (Z.Utils.isStrVal(Z.saveHandlerPath)) {
					// Build full save handler path.
					var sHPF = Z.saveHandlerPath;

					// DEV NOTE: JavaScript cross-domain block conflicts with specifying server IP and port.
					//if (sHPF.substr(0,1) != "/") { sHPF = "/" + sHPF; }
					//if (Z.serverPort != "80") { sHPF = ":" + Z.serverPort + sHPF; }
					//sHPF = Z.serverIP + sHPF;

					Z.saveHandlerPath = sHPF;
				}
			} else {
				Z.annotationPath = "";
				alert(annotationsDisabledAlert); 			
			}
		}
	},

	removeDups : function (arr) {
		// This function requires a sorted array.
		for (var i = 1;i < arr.length;) {
			if (arr[i-1] == arr[i]) {
				arr.splice(i, 1);
			} else{
				i++;
			}
		}
		return arr;
	},

	intersect : function (a1, a2) {
		// This function requires sorted arrays, each without duplicate values.
		var a3 = [];
		for (var i = 0; i < a1.length; i++) {
			var elmt1 = a1[i];
			var found = false;
			for (var j=0; (j < a2.length) && (elmt1 >= (elmt2 = a2[j])); j++) {
				if (elmt2 == elmt1) {
					found = true;
					break;
				}
			}
			if (found) { a3.push(a1[i]); }
		}
		return a3;
	},

	subtract : function (a1, a2) {
		// This function requires sorted arrays, each without duplicate values.
		for (var i = 0; i < a1.length; i++) {
			var elmt1 = a1[i];
			var found = false;
			for (var j = 0; (j < a2.length) && (elmt1 >= (elmt2 = a2[j])); j++) {
				if (elmt2 == elmt1) {
					found = true;
					break;
				}
			}
			if (found) { a1.splice(i--,1); }
		}
		return a1;
	},
		
	clone : function (arrName, arrFrom, arrTo) {
		// This is a three-level copy function for specific objects in this application, not 
		// a generic clone function. It is compatible with most popular browsers.
		arrTo = [];
		switch (arrName) {
			case "hotspots" :
				for (var i = 0, j = arrFrom.length; i < j; i++) {
					polygonPtsTemp = [];
					var tempPts = arrFrom[i].polygonPts;
					if (arrFrom[i].polygonPts !== null) {
						for (var k = 0, m = tempPts.length; k < m; k++) {
							polygonPtsTemp.push( {
								x: tempPts[k].x,
								y: tempPts[k].y
							 } );
						}
					}
					arrTo.push( { 
						id: arrFrom[i].id,
						internalID: arrFrom[i].internalID,
						name: arrFrom[i].name,
						media: arrFrom[i].media,
						mediaType: arrFrom[i].mediaType,
						image: arrFrom[i].image,
						iW: arrFrom[i].iW,
						iH: arrFrom[i].iH,
						x: arrFrom[i].x,
						y: arrFrom[i].y,
						zoom: arrFrom[i].zoom,
						xScale: arrFrom[i].xScale,
						yScale: arrFrom[i].yScale,
						url: arrFrom[i].url,
						urlTarget: arrFrom[i].urlTarget,
						visibility: arrFrom[i].visibility,
						rollover: arrFrom[i].rollover,
						caption: arrFrom[i].caption,
						tooltip: arrFrom[i].tooltip,
						textColor: arrFrom[i].textColor,
						backColor: arrFrom[i].backColor,
						lineColor: arrFrom[i].lineColor,
						fillColor: arrFrom[i].fillColor,
						textVisible: arrFrom[i].textVisible,
						backVisible: arrFrom[i].backVisible,
						lineVisible: arrFrom[i].lineVisible,
						fillVisible: arrFrom[i].fillVisible,
						captionPosition: arrFrom[i].captionPosition,
						saved: arrFrom[i].saved,
						polygonPts: polygonPtsTemp
					 } );
				}
				break;
			case "pois" :
				for (var i = 0, j = arrFrom.length; i < j; i++) {
					arrTo.push( { text:arrFrom[i].text, value:arrFrom[i].value, x:arrFrom[i].x, y:arrFrom[i].y, zoom:arrFrom[i].zoom } );	
				}
				break;
			case "notes" :
				for (var i = 0, j = arrFrom.length; i < j; i++) {
					arrTo.push( { text:arrFrom[i].text, value:arrFrom[i].value, noteText:arrFrom[i].noteText, poiID:arrFrom[i].poiID } );		
				}
				break;
			case "labels" :
				for (var i = 0, j = arrFrom.length; i < j; i++) {
					arrTo.push( { text:arrFrom[i].text, value:arrFrom[i].value, poiID:arrFrom[i].poiID } );
				}
				break;
		}
		return arrTo;
	},
	
	calculatePointsDistance : function (x1, y1, x2, y2) {
		return Math.sqrt((x1 -= x2) * x1 + (y1 -= y2) * y1);
		
		// DEV NOTE: Alternative implementation:
		//return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	},
	
	getDimensionsFromPolygonPoints : function (polyPts) {
		var smallestX = polyPts[0].x;
		var smallestY = polyPts[0].y;
		var largestX = polyPts[0].x;
		var largestY = polyPts[0].y;
		for (var i = 1, j = polyPts.length; i < j; i++) {
			if (polyPts[i].x < smallestX) { smallestX = polyPts[i].x; }
			if (polyPts[i].x > largestX) { largestX = polyPts[i].x; }
			if (polyPts[i].y < smallestY) { smallestY = polyPts[i].y; }
			if (polyPts[i].y > largestY) { largestY = polyPts[i].y; }
		}
		var w = largestX - smallestX;
		var h = largestY - smallestY;
		return new Z.Utils.Point(w, h);
	},
	
	getCenterOfPolygonPoints : function (polyPts) {
		var smallestX = polyPts[0].x;
		var smallestY = polyPts[0].y;
		var largestX = polyPts[0].x;
		var largestY = polyPts[0].y;
		for (var i = 1, j = polyPts.length; i < j; i++) {
			smallestX = Math.min(smallestX, polyPts[i].x);
			smallestY = Math.min(smallestY, polyPts[i].y);
			largestX = Math.max(largestX, polyPts[i].x);
			largestY = Math.max(largestY, polyPts[i].y);			
		}
		var ctrX = smallestX + ((largestX - smallestX) / 2);
		var ctrY = smallestY + ((largestY - smallestY) / 2);
		return new Z.Utils.Point(ctrX, ctrY);
	},

	createCallback : function (object, method) {
		var initialArgs = [];
		for (var i = 2, j = arguments.length; i < j; i++) {
			initialArgs.push(arguments[i]);
		}
		return function () {
			var args = initialArgs.concat([]);
			for (var i = 0, j = arguments.length; i < j; i++) {
				args.push(arguments[i]);
			}
			return method.apply(object, args);
		};
	},

	createContainerElement : function (tagName, id, display, position, overflow, width, height, left, top, borderStyle, borderWidth, background, margin, padding, whiteSpace, cursor) {
		var emptyContainer = document.createElement(tagName);
		if (this.isStrVal(id)) { emptyContainer.id = id; }
		var ecS = emptyContainer.style;
		ecS.display = (this.isStrVal(display)) ? display : "inline-block";
 		ecS.position = (this.isStrVal(position)) ? position : "static";
 		ecS.overflow = (this.isStrVal(overflow)) ? overflow : "hidden";
 		if (tagName == "canvas") {
 			if (this.isStrVal(width)) { emptyContainer.setAttribute('width', width); }
 			if (this.isStrVal(height)) { emptyContainer.setAttribute('height', height); }
 		} else {
 			if (this.isStrVal(width)) { ecS.width = width; }
 			if (this.isStrVal(height && height)) { ecS.height = height; }
 		}
 		if (this.isStrVal(left)) { ecS.left = left; }
 		if (this.isStrVal(top)) { ecS.top = top; }
 		ecS.borderStyle = (this.isStrVal(borderStyle)) ? borderStyle : "none";
 		ecS.borderWidth = (this.isStrVal(borderWidth)) ? borderWidth : "0px";
 		ecS.borderColor = "#696969";
 		ecS.background = (this.isStrVal(background)) ? background : "transparent none";
 		ecS.margin = (this.isStrVal(margin)) ? margin : "0px";
 		ecS.padding = (this.isStrVal(padding)) ? padding : "0px";
 		ecS.whiteSpace = (this.isStrVal(whiteSpace)) ? whiteSpace : "normal";
 		if (this.isStrVal(cursor)) { ecS.cursor = cursor; } // No explicit default assignment.
		return emptyContainer;
	},

	createCenteredElement : function (elmt) {
		var div = this.createContainerElement("div");
		var html = [];
		html.push('<div style="display:table; height:100%; width:100%;');
		html.push('border:none; margin:0px; padding:0px;');
		html.push('#position:relative; overflow:hidden; text-align:left;">');
		html.push('<div style="#position:absolute; #top:50%; width:100%; ');
		html.push('border:none; margin:0px; padding:0px;');
		html.push('display:table-cell; vertical-align:middle;">');
		html.push('<div style="#position:relative; #top:-50%; width:100%; ');
		html.push('border:none; margin:0px; padding:0px;');
		html.push('text-align:center;"></div></div></div>');
		div.innerHTML = html.join('');
		div = div.firstChild;
		var innerDiv = div;
		var innerDivs = div.getElementsByTagName("div");
		while (innerDivs.length > 0) {
			innerDiv = innerDivs[0];
			innerDivs = innerDiv.getElementsByTagName("div");
		}
		innerDiv.appendChild(elmt);
		return div;
	},

	createGraphicElement : function (imageSrc) {
		var gImg = this.createContainerElement("img");
		var gElmt = null;
		if (Z.browser == Z.browsers.IE && Z.browserVersion < 7) {
			gElmt = this.createContainerElement("span", null, "inline-block");
			gImg.onload = function () {
				gElmt.style.width = gElmt.style.width || gImg.width + "px";
				gElmt.style.height = gElmt.style.height || gImg.height + "px";
				gImg.onload = null;
				gImg = null;
			};
			gElmt.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + imageSrc + "', sizingMethod='scale')";
		} else {
			gElmt = gImg;
			gElmt.src = imageSrc;
		}
		return gElmt;
	},
	
	createTextElement : function (id, value, width, height, left, top, padding, border, borderWidth, overflowY, readOnly, fontFamily, fontSize, resize) {
		var textBox = Z.Utils.createContainerElement("div", "textBoxFor" + id, "inline-block", "absolute", "hidden", width, height, left, top, border, borderWidth, "white", "0px", padding, "normal");
		var textArea = document.createElement('textarea');
		textBox.appendChild(textArea);
		var ntA = textArea;
		var ntaS = ntA.style;
		ntA.id = id;
		ntA.value = value;
		ntA.readOnly = readOnly;		
		ntA.overflowY = overflowY;
		ntaS.width = "100%";
		ntaS.height = "100%";
		ntaS.margin = "0";
		ntaS.border = "0";
		ntaS.fontFamily = fontFamily;
		ntaS.fontSize = fontSize;
		ntaS.resize = resize;
		return textBox;
	},
	
	createSelectElement : function (listID, listTitle, dataProvider, listW, listX, listY, visible, handler) {
		// Create list.
		sList = document.createElement("select");
		sList.id = listID;
		if (Z.Utils.isStrVal(listTitle)) { sList.options[0] = new Option(listTitle, null); } // First option, set without value.
		for (var i = 0, j = dataProvider.length; i < j; i++) {
			sList.options[sList.options.length] = new Option(dataProvider[i].text, dataProvider[i].value);
		}
		sList.onchange = handler;
		
		// Set list position and visibilty.
		sList.style.width = listW + "px";
		sList.style.position = "absolute";	
		sList.style.left = listX + "px";
		sList.style.top = listY + "px";
		sList.style.visibility = visible;
		
		return sList;
	},
	
	updateSelectElement : function (listObject, dataProvider) {
		if (listObject) { 
			listObject.innerHTML = "";
			for (var i = 0, j = dataProvider.length; i < j; i++) {
				listObject.options[listObject.options.length] = new Option(dataProvider[i].text, dataProvider[i].value);
			}	
		}
	},

	setTextStyle : function (textNode, color, fontFamily, fontSize, fontSizeAdjust, fontStyle, fontStretch, fontVariant, fontWeight, lineHeight, textAlign, textDecoration) {
		var textStyle = textNode.parentNode.style;
		textStyle.color = color;
		textStyle.fontFamily = fontFamily;
		textStyle.fontSize = fontSize;
		textStyle.fontSizeAdjust = fontSizeAdjust;
		textStyle.fontStyle = fontStyle;
		textStyle.fontStretch = fontStretch;
		textStyle.fontVariant = fontVariant;
		textStyle.fontWeight = fontWeight;
		textStyle.lineHeight = lineHeight;
		textStyle.textAlign = textAlign;
		textStyle.textDecoration = textDecoration;
	},

	convertXMLTextToXMLDoc : function (xmlText) {
		var xmlDoc = null;
		if (window.ActiveXObject) {
			try {
				xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
				xmlDoc.async = false;
				xmlDoc.loadXML(xmlText);
			} catch (e) {
				this.showMessage(e.name + this.getResource("ERROR_CONVERTINGXMLTEXTTODOC") + e.message);
			}
		} else if (window.DOMParser) {
			try {
				var parser = new DOMParser();
				xmlDoc = parser.parseFromString(xmlText, "text/xml");
			} catch (e) {
				this.showMessage(e.name + this.getResource("ERROR_CONVERTINGXMLTEXTTODOC") + e.message);
			}
		} else {
			this.showMessage(this.getResource("ERROR_XMLDOMUNSUPPORTED"));
		}
		return xmlDoc;
	},

	convertXMLDocToXMLText : function (xmlDoc) {
		var xmlText = null;
		if (window.ActiveXObject) {
			try {
				xmlText = xmlDoc.xml;
			} catch (e) {
				this.showMessage(e.name + this.getResource("ERROR_CONVERTINGXMLDOCTOTEXT") + e.message);
			}
		} else if (window.DOMParser) {
			try {
				xmlText = (new XMLSerializer()).serializeToString(xmlDoc);
			} catch (e) {
				this.showMessage(e.name + this.getResource("ERROR_CONVERTINGXMLDOCTOTEXT") + e.message);
			}
		} else {
			this.showMessage(this.getResource("ERROR_XMLDOMUNSUPPORTED"));
		}
		return xmlText;
	},

	Point : function (x, y) {
		this.x = typeof x === "number" ? x : 0;
		this.y = typeof y === "number" ? y : 0;
	},

	Point3D : function (x, y, z) {
		this.x = typeof x === "number" ? x : 0;
		this.y = typeof y === "number" ? y : 0;
		this.z = typeof z === "number" ? z : 0;
	},

	getResource : function (resName) {
		// Access default values, constants, and localizable strings (tooltips, messages, errors).
		var resTxt = "";
		switch(resName) {
			case "DEFAULT_PARAMETERSENABLETEST" :
				// Use "Enable Developer parameters" to enable Developer parameter support and value of DEFAULT_PARAMETERSDISABLEVALUE to disable.
				resTxt = "Enable Developer parameters";
				//resTxt = "Changing This Violates License Agreement";
				break;
			case "DEFAULT_PARAMETERSDISABLEVALUE" :
				resTxt = "Changing This Violates License Agreement";
				break;
			case "DEFAULT_PARAMETERSDISABLEDALERT" :
				resTxt = "Support for this parameter is enabled only in the Zoomify Image Viewer included in the Zoomify HTML5 Developer edition: ";
				break;	
				
			case "DEFAULT_SPECIALSTORAGESUPPORTENABLETEST" :
				// Use "Enable special storage support" to enable Enterprise PFF and other special storage support and value of DEFAULT_SPECIALSTORAGESUPPORTDISABLEVALUE to disable.
				//resTxt = "Enable special storage support"; 
				resTxt = "Changing this violates License Agreement";
				break;
			case "DEFAULT_SPECIALSTORAGESUPPORTDISABLEVALUE" :
				resTxt = "Changing this violates License Agreement";
				break;
			case "DEFAULT_SPECIALSTORAGESUPPORTDISABLEDALERT" :
				resTxt = "Support for Zoomify Image File (PFF) storage and other special storage options is enabled only in the Zoomify Image Viewer included in the Zoomify Enterprise products.";
				break;	
				
			case "DEFAULT_ANNOTATIONSUPPORTENABLETEST" :
				// Use "Enable annotation support" to enable Enterprise annotation support and value of DEFAULT_ANNOTATIONSUPPORTDISABLEVALUE to disable.
				//resTxt = "Enable annotation support"; 
				resTxt = "Changing this violates License Agreement";
				break;
			case "DEFAULT_ANNOTATIONSUPPORTDISABLEVALUE" :
				resTxt = "Changing this violates License Agreement";
				break;
			case "DEFAULT_ANNOTATIONSUPPORTDISABLEDALERT" :
				resTxt = "Support for annotations is enabled only in the Zoomify Image Viewer included in the Zoomify Enterprise products.";
				break;				

			case "DEFAULT_TILESIZE" :
				resTxt = "256";
				break;
			case "DEFAULT_IMAGESLOADINGMAX" :
				resTxt = "200";
				break;
			case "DEFAULT_IMAGELOADTIMEOUT" :
				resTxt = "30000";	// 30 seconds.
				break;
			case "DEFAULT_TIERSMAXSCALEUP" :
				resTxt = "1.15";
				break;
			case "DEFAULT_TILESMAXCACHE" :
				if (!Z.mobileDevice) {
					resTxt = "300";	// At average 10K / tile, average 3MB max cache - 30MB if stored uncompressed - plus whatever browser caches by default.
				} else {
					resTxt = "50";	// At average 10K / tile, average 0.5MB max cache - 5MB if stored uncompressed - plus whatever browser caches by default.
				}
				break;
			case "DEFAULT_BACKFILLTHRESHOLD2" :
				resTxt = "6";
				break;
			case "DEFAULT_BACKFILLTHRESHOLD1" :
				resTxt = "3";
				break;
			case "DEFAULT_BACKFILLCHOICE2" :
				resTxt = "3";
				break;
			case "DEFAULT_BACKFILLCHOICE1" :
				resTxt = "2";
				break;
			case "DEFAULT_BACKFILLCHOICE0" :
				resTxt = "0";
				break;
			case "DEFAULT_PANBUFFER" :
				// Typical display area dimensions of 900 x 550 pixels requires 12 tiles (4 x 3)
				// if pan buffer set to 1 (no buffer), 24 tiles (6 x 4) if set to 1.5, and 40 (8 x 5)
				// if set to 2.  If zoomed between tiers needed tiles can double or triple (rare).
				if (!Z.mobileDevice) {
					resTxt = "1.5"; 
				} else {
					resTxt = "1";
				}
				break;
			case "DEFAULT_PANSPEED" :
				resTxt = "5"; // "1"=slow to "10"=fast, default is "5".
				break;
			case "DEFAULT_PANSTEPDISTANCE" :
				resTxt = "10"; // 5 * 10 = 50 pixel step per 0.1 second interval.
				break;
			case "DEFAULT_ZOOMSPEED" :
				resTxt = "5"; // "1"=slow to "10"=fast, default is "5".
				break;
			case "DEFAULT_ZOOMSTEPDISTANCE" :
				resTxt = "0.02"; // 5 * 0.02 = .1 percent step default.
				break;
			case "DEFAULT_ZAPSTEPDURATION" :
				resTxt = "30";  // Milliseconds.
				break;
			case "DEFAULT_ZAPTVSTEPS" :
				resTxt = "20"; // 800 / 20 = 0.04 seconds per step default with variable distance per step.
				break;			
			case "DEFAULT_ZAPTVDURATION" :
				resTxt = "800"; // 800 / 20 = 0.04 seconds per step default with variable distance per step.
				break;	
			case "DEFAULT_CLICKZOOMTIERSKIPTHRESHOLD" :
				resTxt = "0.2";  // % of zoom delta from exact next/prior tier.
				break;
			case "DEFAULT_GESTURETESTDURATION" :
				resTxt = "10";  // Milliseconds.
				break;	
			case "DEFAULT_FADEINSPEED" :
				resTxt = "5"; // "1"=slow to "10"=fast, default is "5". 
				break;
			case "DEFAULT_FADEINSTEP" :
				resTxt = "0.067"; // 0.067 * default fade in speed of 5 = 0.335 x 3 steps to get over 1, at 50 milliseconds per step = 0.2 seconds to fade-in.
				break;
			case "DEFAULT_TOOLBARVISIBLE" : 
				resTxt = "4";  // "0"=hide, "1"=show, "2"=show/hide (default), "3"=hide/show, "4" & "5"=same as 2 and 3 but minimize rather than hiding. Note: minimize forced if setting is 2 or 3 and browser is on mobile device (no mouse-over).
				break;
			case "DEFAULT_TOOLBARPOSITION" :
				resTxt = "1"; // "0"=top, "1"=bottom (default).
				break;
			case "DEFAULT_TOOLTIPSVISIBLE" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;
			case "DEFAULT_NAVIGATORVISIBLE" :  
				resTxt = "2";  // "0"=hide, "1"=show, "2"=show/hide (default), "3"=hide/show, "4" & "5"=same as 2 and 3 but minimize rather than hiding. Note: minimize forced if setting is 2 or 3 and browser is on mobile device (no mouse-over).
				break;
			case "DEFAULT_NAVIGATORWIDTH" :
				resTxt = "150";
				break;
			case "DEFAULT_NAVIGATORHEIGHT" :
				resTxt = "100";
				break;
			case "DEFAULT_NAVIGATORLEFT" :
				resTxt = "0";
				break;
			case "DEFAULT_NAVIGATORTOP" :
				resTxt = "0";
				break;
			case "DEFAULT_NAVIGATORFIT" :
				resTxt = null;
				break;
			case "DEFAULT_NAVIGATORBACKCOLOR" :
				resTxt = "#ffffff";
				break;
			case "DEFAULT_NAVIGATORBACKCOLORNOALPHA" :
				resTxt = "#fbfafa";
				break;
			case "DEFAULT_NAVIGATORBACKALPHA" :
				resTxt = "0.75";
				break;				
			case "DEFAULT_ANNOTATIONPANELBACKCOLOR" :
				resTxt = "#ffffff";
				break;
			case "DEFAULT_ANNOTATIONPANELBACKCOLORNOALPHA" :
				resTxt = "#fbfafa";
				break;
			case "DEFAULT_ANNOTATIONPANELBACKALPHA" :
				resTxt = "0.75";
				break;
			case "DEFAULT_NAVIGATORRECTANGLECOLOR" :
				resTxt = "blue";
				break;
			case "DEFAULT_SKINXMLFILE" :
				resTxt = "skinFiles.xml"; 
				break;
			case "DEFAULT_SKINXMLPATH" :
				resTxt = "Assets/Skins/Default";
				break;				
			case "DEFAULT_SKINMODE" :
				resTxt = "0"; // "0"=autoswitch if mobile device (default), "1"=always standard, "2"= always large.
				break;
			case "DEFAULT_CONSTRAINPAN" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;
			case "DEFAULT_SLIDERVISIBLE" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;
			case "DEFAULT_SLIDERTESTDURATION" :
				resTxt = "10";  // Milliseconds.
				break;	
			case "DEFAULT_FULLPAGEVISIBLE" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;	
			case "DEFAULT_FULLPAGEINITIAL" :
				resTxt = "0"; // "0"=false (default), "1"=true.
				break;				
			case "DEFAULT_FULLPAGEBACKCOLOR" :
				resTxt = "white";
				break;
			case "DEFAULT_FPCANCELBUTTONTEXT" :
				resTxt = "X";
				break;
			case "DEFAULT_FPCANCELBUTTONCOLOR" :
				resTxt = "	#F8F8F8"; // Very light grey.
				break;
			case "DEFAULT_PROGRESSVISIBLE" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;
			case "DEFAULT_PROGRESSDURATION" :
				resTxt = "500";  // Milliseconds.
				break;
			case "DEFAULT_PROGRESSTEXT" :
				resTxt = " ";  // Blank.
				break;
			case "DEFAULT_LOGOVISIBLE" :
				resTxt = "1"; // "0"=false, "1"=true (default).
				break;
			case "DEFAULT_LOGOCUSTOMPATH" :
				resTxt = null;
				break;
			case "DEFAULT_CANVAS" :  // "0"=false, "1"=true.
				resTxt = "1";
				break;
			case "DEFAULT_DEBUG" :  // "0"=disable, "1"=enable, "2"=enable with tile name labels and tracing.
				resTxt = "0";
				break;
			case "DEFAULT_MESSAGESCREENCOLOR" :
				resTxt = "lightgray";
				break;
			case "DEFAULT_MESSAGEBUTTONCOLOR" :
				resTxt = "white";
				break;
			case "DEFAULT_MESSAGEOKBUTTONTEXT" :
				resTxt = "OK";
				break;
			case "DEFAULT_MESSAGECANCELBUTTONTEXT" :
				resTxt = "Cancel";
				break;
			case "DEFAULT_COPYRIGHTSCREENCOLOR" :
				resTxt = "lightgray";
				break;
			case "DEFAULT_COPYRIGHTBUTTONCOLOR" :
				resTxt = "white";
				break;
			case "DEFAULT_COPYRIGHTAGREEBUTTONTEXT" :
				resTxt = "Agree";
				break;
			case "DEFAULT_COPYRIGHTEXITBUTTONTEXT" :
				resTxt = "Exit";
				break;
			case "DEFAULT_WATERMARKALPHA" :
				resTxt = "0.6";
				break;
			case "DEFAULT_WATERMARKMINSCALE" :
				resTxt = "0.33";
				break;
			case "DEFAULT_WATERMARKSPANW" :
				resTxt = "512"; // Horizontal image pixels per watermark.
				break;
			case "DEFAULT_WATERMARKSPANH" :
				resTxt = "384"; // Vertical image pixels per watermark.
				break;	
			case "DEFAULT_HOTSPOTSXMLFILE" :
				resTxt = "hotspots.xml"; 
				break;	
			case "DEFAULT_HOTSPOTCAPTIONPADDING" :
				resTxt = "6"; 
				break;		
			case "DEFAULT_MINHOTSPOTCAPTIONPADDING" :
				resTxt = "2"; 
				break;		
			case "DEFAULT_MAXHOTSPOTCAPTIONPADDING" :
				resTxt = "7"; 
				break;					
			case "DEFAULT_HOTSPOTCAPTIONFONTSIZE" :
				resTxt = "14"; 
				break;				
			case "DEFAULT_MINHOTSPOTCAPTIONFONTSIZE" :
				resTxt = "3"; 
				break;	
			case "DEFAULT_MAXHOTSPOTCAPTIONFONTSIZE" :
				resTxt = "14"; 
				break;						
			case "DEFAULT_FONTTOPIXELSCONVERSIONFACTOR" :
				resTxt = "1.8"; 
				break;
			case "DEFAULT_HOTSPOTSINITIALVISIBILITY" :
				resTxt = true; 
				break;
			case "DEFAULT_POLYGONLINEWIDTH" :
				resTxt = 1; 
				break;
			case "DEFAULT_POLYGONVIEWINCREMENT" :
				resTxt = 300; 
				break;				
			case "DEFAULT_CONTROLPOINTLINEWIDTH" :
				resTxt = "1"; 
				break;	
			case "DEFAULT_CONTROLPOINTSTROKECOLOR" :
				resTxt = "#ffffff"; 
				break;	
			case "DEFAULT_FIRSTCONTROLPOINTFILLCOLOR" :
				resTxt = "#ffffff"; 
				break;	
			case "DEFAULT_STANDARDCONTROLPOINTFILLCOLOR" :
				resTxt = "#999999"; 
				break;	
			case "DEFAULT_CONTROLPOINTRADIUS" :
				resTxt = "10"; 
				break;		
			case "DEFAULT_HOTSPOTLISTTITLE" :
				resTxt = "Hotspots"; 
				break;				
			case "DEFAULT_HOTSPOTLISTSOURCE" :
				resTxt = "NAME"; 
				break;	
			case "DEFAULT_HOTSPOTLISTWIDTH" :
				resTxt = "200"; 
				break;			
			case "DEFAULT_HOTSPOTLISTPOSITION" :
				resTxt = "2"; 
				break;				
			case "DEFAULT_ANNOTATIONSXMLFILE" :
				resTxt = "annotations.xml"; 
				break;		
			case "DEFAULT_ANNOTATIONSXMLSAVEHANDLERNAME1" :
				resTxt = "save"; 
				break;
			case "DEFAULT_ANNOTATIONSXMLSAVEHANDLERNAME2" :
				resTxt = "upload"; 
				break;
			case "DEFAULT_ANNOTATIONSINITIALVISIBILITY" :
				resTxt = true; 
				break;
			case "DEFAULT_ANNOTATIONPANELWIDTH" :
				resTxt = "220"; 
				break;
			case "DEFAULT_ANNOTATIONPANELHEIGHT" :
				resTxt = "200";
				break;
			case "DEFAULT_ANNOTATIONLISTWIDTH" :
				resTxt = "160"; 
				break;
			case "DEFAULT_ANNOTATIONNOTEWIDTH" :
				resTxt = "189";
				break;				
			case "DEFAULT_ANNOTATIONNOTEHEIGHT" :
				resTxt = "88";
				break;
			case "DEFAULT_ANNOTATIONNOTEPADDING" :
				resTxt = "6"; 
				break;
			case "DEFAULT_ANNOTATIONNOTEFONTSIZE" :
				resTxt = "11"; 
				break;
			case "DEFAULT_ANNOTATIONNOTEVISIBILITY" :
				resTxt = true; 
				break;
			case "DEFAULT_ANNOTATIONPANELLABELFONTSIZE" :
				resTxt = "11"; 
				break;
			case "DEFAULT_INITIALX" :
				resTxt = null;
				break;
			case "DEFAULT_INITIALY" :
				resTxt = null;
				break;
			case "DEFAULT_INITIALZOOM" :			
				resTxt = null; // "1" to "100" recommended range**, default is null (zoom-to-fit view area).
				break;
			case "DEFAULT_MINZOOM" :
				resTxt = null; // "1" to "100" recommended range**, default is null (zoom-to-fit view area).
				break;
			case "DEFAULT_MAXZOOM" :
				resTxt = "1"; // "1" to "100" recommended range**, default is "1" (100%).
				break;
			case "DEFAULT_CLICKZOOM" :
				resTxt = "1"; // "0"=disable, "1"=enable (default).
				break;
			case "DEFAULT_CLICKPAN" :
				resTxt = "1"; // "0"=disable, "1"=enable (default).
				break;
			case "DEFAULT_MOUSEPAN" :
				resTxt = "1"; // "0"=disable, "1"=enable (default).
				break;
			case "DEFAULT_KEYS" :
				resTxt = "1"; // "0"=disable, "1"=enable (default).
				break;
			case "DEFAULT_TRACEDISPLAYDEBUGINFOTEXT" :
				resTxt = "This panel is enabled using the HTML parameter 'zDebug=1' (basic) or 'zDebug=2' (adds tile tracing). " +
				"It can be called in JavaScript as follows:\n\n   Z.Utils.trace('value to display');  \n\nThe " +
				"buttons below display or modify important state values.  Web designers " +
				"new to JavaScript will also benefit from the console, trace, profiling, and " +
				"other debugging features of leading browsers.";
				break;
			case "DEFAULT_TRACEDISPLAYSCREENCOLOR" :
				resTxt = "lightgray";
				break;
			case "DEFAULT_TRACEDISPLAYBUTTONCOLOR" :
				resTxt = "white";
				break;
			case "DEFAULT_TRACEDISPLAYSHOWGLOBALSBUTTONTEXT" :
				resTxt = "Show Globals";
				break;
			case "DEFAULT_TRACEDISPLAYTOGGLEDISPLAYBUTTONTEXT" :
				resTxt = "Toggle Display";
				break;
			case "DEFAULT_TRACEDISPLAYTOGGLEBACKFILLBUTTONTEXT" :
				resTxt = "Toggle Backfill";
				break;
			case "DEFAULT_TRACEDISPLAYTOGGLECONSTRAINPANBUTTONTEXT" :
				resTxt = "Toggle Constrain Pan";
				break;
			case "DEFAULT_FOCAL" :
				resTxt = "1";
				break;
			case "DEFAULT_QUALITY" :
				resTxt = "55";
				break;
			case "ALERT_POLYGONSREQUIRECANVAS" :
				resTxt = "Displaying or editing polygon hotspots requires a browser that supports the HTML5 canvas feature."
				break;
			case "ALERT_CANCELLINGUNSAVEDEDITS" :
				resTxt = "Cancelling all unsaved edits."
				break;	
			case "ALERT_SAVINGUNSAVEDEDITS" :
				resTxt = "Saving unsaved edits."
				break;			
			case "ALERT_ANNOTATIONSAVESUCCESSFUL" :
				resTxt = "XML save complete."
				break;		
			case "ALERT_SAVEDISABLEDFORDEMOKEY" :
				resTxt = "SAVEDISABLEDFORDEMO"
				break;
			case "ALERT_SAVEDISABLEDFORDEMOTEXT" :
				resTxt = "Edits to this demo are saved only for the duration of the browser session."
				break;
			case "ERROR_XMLHTTPREQUESTUNSUPPORTED" :
				resTxt = "Browser does not support XMLHttpRequest."
				break;
			case "ERROR_MAKINGNETWORKREQUEST-IMAGEXML" :
				resTxt = "Error loading image: please make sure image path in web page matches image folder location on webserver.";
				break;
			case "ERROR_MAKINGNETWORKREQUEST-IMAGEHEADER" :
				resTxt = "Error loading image: image header request invalid.";
				break;
			case "ERROR_MAKINGNETWORKREQUEST-IMAGEOFFSET" :
				resTxt = "Error loading image: image offset request invalid.";
				break;				
			case "ERROR_MAKINGNETWORKREQUEST-TOOLBARXML" :
				resTxt = "Error loading toolbar - skin files not found: please verify that the folders 'Assets/Skins/Default' are in same folder as the web page displaying the Viewer, or add zSkinPath parameter to web page.";
				break;				
			case "ERROR_MAKINGNETWORKREQUEST-HOTSPOTSXML" :
				resTxt = "Error loading hotspots: please make sure hotspot path in web page matches hotspot folder location on webserver.";
				break;				
			case "ERROR_MAKINGNETWORKREQUEST-ANNOTATIONSXML" :
				resTxt = "Error loading annotations: please make sure annotation path in web page matches annotation folder location on webserver.";
				break;				
			case "ERROR_MAKINGNETWORKREQUEST-ANNOTATIONSSAVEHANDLER" :
				resTxt = "Error saving annotations: please make sure save handler path in web page matches save handler file location on webserver.";
				break;
			case "ERROR_MAKINGNETWORKREQUEST" :
				resTxt = "Error making network request: possible invalid path or network error.";
				break;
			case "ERROR_IMAGEPATHINVALID" :
				resTxt = "Image failed to load: possible invalid path, missing image, or network error."
				break;
			case "ERROR_TILEPATHINVALID" :
				resTxt = "Sorry!  Part of this view isn't refreshing.  The network may be slow, or the website might be missing a file:  "
				break;
			case "ERROR_HOTSPOTPATHINVALID" :
				resTxt = "Hotspot media failed to load: possible invalid path, missing file, or legacy hotspot media such as library clip of Flash-based viewer."
				break;
			case "ERROR_HOTSPOTMEDIAINVALID" :
				resTxt = "Media of one or more hotspots unsupported: hotspot media of type 'symbol' depend on internal Library of Flash-based viewers."
				break;
			case "ERROR_XMLSAVEHANDLERPATHINVALID" :
				resTxt = "Annotations cannot be saved: missing or incorrect save handler path parameter, or missing file on server."
				break;
			case "ERROR_NETWORKSECURITY" :
				resTxt = "Error related to network security: ";
				break;
			case "ERROR_NETWORKSTATUS" :
				resTxt = "Error related to network status: ";
				break;
			case "ERROR_CONVERTINGXMLTEXTTODOC" :
				resTxt = " converting XML text to XML doc (DOMParser): ";
				break;
			case "ERROR_CONVERTINGXMLDOCTOTEXT" :
				resTxt = " converting XML doc to XML text (DOMParser): ";
				break;			
			case "ERROR_XMLDOMUNSUPPORTED" :
				resTxt = "Browser does not support XML DOM.";
				break;
			case "ERROR_XMLDOCINVALID" :
				resTxt =  "XML Doc invalid.";
				break;
			case "ERROR_XMLINVALID" :
				resTxt =  "XML invalid.";
				break;
			case "ERROR_IMAGEXMLINVALID" :
				resTxt =  "Image XML invalid.";
				break;
			case "ERROR_IMAGEPROPERTIESPARAMETERINVALID" :
				resTxt =  "Image properties parameter invalid.";
				break;
			case "ERROR_IMAGETILECOUNTINVALID" :
				resTxt =  "Image tile count does not match value in image XML. If the count is invalid display problems can result.";
				break;
			case "ERROR_EXECUTINGCALLBACK" :
				resTxt = " while executing callback: "
				break;
			case "ERROR_IMAGEREQUESTTIMEDOUT" :
				resTxt = "Image timed out: "
				break;
			case "ERROR_NAVIGATORIMAGEPATHINVALID" :
				resTxt = "Navigator image failed to load: possible invalid path, missing image, or network error."
				break;
			case "ERROR_SKINXMLINVALID" :
				resTxt =  "Skin XML invalid.";
				break;
			case "ERROR_SKINXMLMISSINGNAMES" :
				resTxt =  "The skin XML file has one or more faulty name lines.";
				break;
			case "ERROR_WATERMARKPATHINVALID" :
				resTxt =  "Watermark image failed to load: ";
				break;
			case "ERROR_UNKNOWNELEMENTSTYLE" :
				resTxt =  "Unknown element style - no known method to identify.";
				break;
			case "ERROR_UNKNOWNMOUSEPOSITION" :
				resTxt =  "Unknown mouse position - no known method to calculate.";
				break;
			case "ERROR_UNKNOWNMOUSESCROLL" :
				resTxt =  "Unknown mouse scroll - no known method to calculate.";
				break;
			case "ERROR_UNKNOWNWINDOWSIZE" :
				resTxt =  "Unknown window size - no known method to calculate.";
				break;
			case "TIP_LOGO" :
				resTxt =  "Launch Zoomify Website";
				break;
			case "TIP_MINIMIZE" :
				resTxt =  "Minimize Toolbar";
				break;
			case "TIP_EXPAND" :
				resTxt =  "Expand Toolbar";
				break;
			case "TIP_ZOOMOUT" :
				resTxt =  "Zoom Out";
				break;
			case "TIP_SLIDER" :
				resTxt =  "Zoom In And Out";
				break;
			case "TIP_ZOOMIN" :
				resTxt =  "Zoom In";
				break;
			case "TIP_PANLEFT" :
				resTxt =  "Pan Left";
				break;
			case "TIP_PANUP" :
				resTxt =  "Pan Up";
				break;
			case "TIP_PANDOWN" :
				resTxt =  "Pan Down";
				break;
			case "TIP_PANRIGHT" :
				resTxt =  "Pan Right";
				break;
			case "TIP_RESET" :
				resTxt =  "Reset Initial View";
				break;
			case "TIP_TOGGLEFULLPAGE" :
				resTxt =  "Toggle Full Page View";
				break;			
			case "TIP_CANCELFULLPAGE" :
				resTxt =  "Cancel Full Page View";
				break;
			case "TIP_TOGGLEEDITMODE" :
				resTxt =  "Toggle Label Editing";
				break;
			case "TIP_EDITDELETE" :
				resTxt =  "Delete Label Selected in Choicelist";
				break;
			case "TIP_EDITCANCEL" :
				resTxt =  "Cancel Edits To Current Label";
				break;
			case "TIP_EDITSAVE" :
				resTxt =  "Save All Label Edits";
				break;
			case "TIP_MESSAGEOK" :
				resTxt =  "Accept and close message";
				break;
			case "TIP_MESSAGECANCEL" :
				resTxt =  "Decline and close message";
				break;
			case "TIP_COPYRIGHTAGREE" :
				resTxt =  "Agree to copyright and view images";
				break;
			case "TIP_COPYRIGHTEXIT" :
				resTxt =  "Exit and do not view images";
				break;
			case "TIP_SHOWGLOBALS" :
				resTxt =  "Toggle Full Page View";
				break;
			case "TIP_TOGGLEDISPLAY" :
				resTxt =  "Toggle Viewport Display";
				break;
			case "TIP_TOGGLEBACKFILL" :
				resTxt =  "Toggle Viewport Backfill";
				break;
			case "TIP_TOGGLECONSTRAINPAN" :
				resTxt =  "Toggle Constrain Pan";
				break;
			case "UI_ANNOTATIONPANELLABELPOI" :
				resTxt = "POI"; 
				break;
			case "UI_ANNOTATIONPANELLABELNOTE" :
				resTxt = "Note"; 
				break;
			case "UI_ANNOTATIONPANELLABELLABEL" :
				resTxt = "Label"; 
				break;					
			case "CONTENT_SKIPUSERNAMENAME" :
				resTxt = "Anonymous";
				break;
			case "CONTENT_POINAME" :
				resTxt = "Unnamed Point Of Interest";
				break;
			case "CONTENT_POIUSER" :
				resTxt = this.getResource("CONTENT_SKIPUSERNAMENAME");
				break;
			case "CONTENT_NOTENAME" :
				resTxt = "Unnamed Note";
				break;
			case "CONTENT_NOTETEXT" :
				resTxt = "Note text";
				break;
			case "CONTENT_NOTEUSER" :
				resTxt = this.getResource("CONTENT_SKIPUSERNAMENAME");
				break;
			case "CONTENT_LABELNAME" :
				resTxt = "Unnamed Label";
				break;
			case "CONTENT_LABELUSER" :
				resTxt = this.getResource("CONTENT_SKIPUSERNAMENAME");
				break;
			case "CONTENT_ANNOTATIONPLACEHOLDERLISTTEXT" :
				resTxt = "List creation in progress...";
				break;
			case "CONTENT_ANNOTATIONPLACEHOLDERNOTETEXT" :
				resTxt = "Note loading in progress...";
				break;
			case "CONTENT_ANNOTATIONSCAPTIONTEXTCOLOR" :
				resTxt = "#000000"; 
				break;
			case "CONTENT_ANNOTATIONSCAPTIONBACKCOLOR" :
				resTxt = "#ffffff";
				break;
			case "CONTENT_ANNOTATIONSCAPTIONBACKVISIBLE" :
				resTxt = "1"; 
				break;
			case "CONTENT_ANNOTATIONSCAPTIONPOSITION" :
				resTxt = "8"; 
				break;
			case "CONTENT_POLYGONLINECOLOR" :
				resTxt = "#ffff00"; 
				break;
			case "CONTENT_POLYGONFILLCOLOR" :
				resTxt = "#ffffff"; 
				break;
			case "CONTENT_POLYGONLINEVISIBLE" :
				resTxt = "1"; 
				break;
			case "CONTENT_POLYGONFILLVISIBLE" :
				resTxt = "1"; 
				break;				
			default:
				resTxt = "Unexpected resource request";
		}
		return resTxt;
	},

	showGlobals : function () {
		// Debug option: Combines global variables as a single string and displays their current values.
		var gVs = "";
		gVs += "\n";
		gVs += "                            ZOOMIFY IMAGE VIEWER - CURRENT VALUES" + "\n";
		gVs += "\n";
		gVs += "IMAGE & SKIN" + ":    ";
		gVs += "Z.imagePath=" + Z.imagePath + ",   ";
		gVs += "Z.skinPath=" + Z.skinPath + ",   ";
		gVs += "Z.skinMode=" + Z.skinMode + ",   ";
		gVs += "Z.imageW=" + Z.imageW + ",   ";
		gVs += "Z.imageH=" + Z.imageH + ",   ";
		gVs += "tierCount=" + Z.Viewport.getTierCount() + ",   ";
		gVs += "TILE_SIZE=" + Z.Viewport.getTileSize() + "\n";	
		gVs += "\n";
		gVs += "PAGE & BROWSER" + ":    ";
		gVs += "Z.pageContainer=" + Z.pageContainer + ",   ";
		gVs += "Z.browser=" + Z.browser + ",   ";
		gVs += "Z.browserVersion=" + Z.browserVersion + ",   ";
		gVs += "Z.canvasSupported=" + Z.canvasSupported + ",   ";
		gVs += "Z.cssTransformsSupported=" + Z.cssTransformsSupported + ",   ";
		gVs += "Z.cssTransformProperty=" + Z.cssTransformProperty + ",   ";
		gVs += "Z.cssTransformNoUnits=" + Z.cssTransformNoUnits + ",   ";
		gVs += "Z.alphaSupported=" + Z.alphaSupported + ",   ";
		gVs += "Z.renderQuality=" + Z.renderQuality + ",   ";
		gVs += "Z.mobileDevice=" + Z.mobileDevice + "\n";
		gVs += "\n";
		gVs += "VIEWER OPTIONS & DEFAULTS" + ":    ";
		gVs += "Z.initialX=" + Z.initialX + ",   ";
		gVs += "Z.initialY=" + Z.initialY + ",   ";
		gVs += "Z.initialZ=" + Z.initialZ + ",   ";
		gVs += "Z.minZ=" + Z.minZ + ",   ";
		gVs += "Z.maxZ=" + Z.maxZ + ",   ";
		gVs += "Z.fitZ=" + Z.fitZ + ",   ";
		gVs += "Z.zoomSpeed=" + Z.zoomSpeed + ",   ";
		gVs += "Z.panSpeed=" + Z.panSpeed + ",   ";
		gVs += "Z.fadeInSpeed=" + Z.fadeInSpeed + ",   "; 
		gVs += "Z.toolbarVisible=" + Z.toolbarVisible + ",   ";
		gVs += "Z.toolbarW=" + Z.toolbarW + ",   ";
		gVs += "Z.toolbarCurrentW=" + Z.toolbarCurrentW + ",   ";
		gVs += "Z.toolbarH=" + Z.toolbarH + ",   ";
		gVs += "Z.toolbarPosition=" + Z.toolbarPosition + ",   ";
		gVs += "Z.tooltipsVisible=" + Z.tooltipsVisible + ",   ";
		gVs += "Z.navigatorVisible=" + Z.navigatorVisible + ",   ";
		gVs += "Z.navigatorW=" + Z.navigatorW + ",   ";
		gVs += "Z.navigatorH=" + Z.navigatorH + ",   ";
		gVs += "Z.navigatorL=" + Z.navigatorL + ",   ";
		gVs += "Z.navigatorT=" + Z.navigatorT + ",   ";
		gVs += "Z.navigatorFit=" + Z.navigatorFit + ",   ";
		gVs += "Z.clickZoom=" + Z.clickZoom + ",   ";
		gVs += "Z.clickPan=" + Z.clickPan + ",   ";
		gVs += "Z.mousePan=" + Z.mousePan + ",   ";
		gVs += "Z.keys=" + Z.keys + ",   ";
		gVs += "Z.constrainPan=" + Z.constrainPan + ",   ";
		gVs += "Watermark alpha = " + Z.Utils.getResource("DEFAULT_WATERMARKALPHA") + ",   ";
		gVs += "Z.watermarkPath=" + Z.watermarkPath + ",   ";
		gVs += "Z.copyrightPath=" + Z.copyrightPath + ",   ";
		gVs += "Z.hotspotPath=" + Z.hotspotPath + ",   ";	
		gVs += "Z.annotationPath=" + Z.annotationPath + ",   ";	
		gVs += "Z.saveHandlerPath=" + Z.saveHandlerPath + ",   ";
		gVs += "Z.sliderVisible=" + Z.sliderVisible + ",   ";
		gVs += "Z.fullPageVisible=" + Z.fullPageVisible + ",   ";
		gVs += "Z.fullPageInitial=" + Z.fullPageInitial + ",   ";			
		gVs += "Z.progressVisible=" + Z.progressVisible + ",   ";
		gVs += "Z.logoVisible=" + Z.logoVisible + ",   ";
		gVs += "Z.logoCustomPath=" + Z.logoCustomPath + ",   ";
		gVs += "Z.canvas=" + Z.canvas + ",   ";
		gVs += "Z.debug=" + Z.debug + ",   ";
		gVs += "Z.imageProperties=" + Z.imageProperties + ",   ";
		gVs += "Z.serverIP=" + Z.serverIP + ",   ";
		gVs += "Z.serverPort=" + Z.serverPort + ",   ";
		gVs += "Z.tileHandlerPath=" + Z.tileHandlerPath + ",   ";
		gVs += "Z.tileHandlerPathFull=" + Z.tileHandlerPathFull + ",   ";
		gVs += "Z.tileSource=" + Z.tileSource + ",   ";
		gVs += "Z.zEditMode=" + Z.zEditMode + "\n";		
		gVs += "\n";
		gVs += "INTERNAL VALUES" + ":    ";
		gVs += "\n";
		gVs += "displayW=" + Z.Viewport.getW() + ",   ";
		gVs += "displayH=" + Z.Viewport.getH() + ",   ";
		gVs += "tierCurrent=" + Z.Viewport.getTierCurrent() + ",   ";
		gVs += "tierScale=" + Z.Viewport.getTierScale() + ",   ";
		gVs += "TIERS_MAX_SCALE_UP=" + Z.Viewport.getTiersMaxScaleUp() + ",   ";
		gVs += "TIERS_MAX_SCALE_DOWN=" + Z.Viewport.getTiersMaxScaleDown() + ",   ";
		gVs += "TILES_MAX_CACHE=" + Z.Viewport.getTilesMaxCache() + ",   ";
		gVs += "Z.useCanvas=" + Z.useCanvas + "\n";
		gVs += "\n";
		gVs += "INTERNAL LISTS" + ":    ";
		gVs += "tierWs=" + Z.Viewport.getTierWs() + ",   ";
		gVs += "tierHs=" + Z.Viewport.getTierHs() + ",   ";
		gVs += "tierTileCounts=" + Z.Viewport.getTierTileCounts() + ",   ";
		gVs += "tilesLoadingNames=" + Z.Viewport.getTilesLoadingNames() + "\n";
		gVs += "\n";
		alert(gVs);
	},
	
	showMessage : function (messageText) {
		if (!Z.MessageDisplay) { 
			Z.Utils.configureMessageDisplay(messageText);
		} else {
			// Show message display.
			if (Z.messages) { Z.messages.value = messageText; }
			Z.MessageDisplay.style.display = "inline-block";
			if (typeof Z.MessageDisplay.messageTimer !== "undefined" && Z.MessageDisplay.messageTimer !== null) {
				window.clearTimeout(Z.MessageDisplay.messageTimer); 
			}
		}
		Z.MessageDisplay.messageTimer = window.setTimeout(Z.Utils.hideMessageTimerHandler, 2000);
	},

	hideMessage : function () {
		Z.MessageDisplay.style.display = "none"	;
	},

	hideMessageTimerHandler : function () {
		if (Z.MessageDisplay.messageTimer) {
			window.clearTimeout(Z.MessageDisplay.messageTimer);
			Z.MessageDisplay.messageTimer = null;
		}
		Z.Utils.hideMessage();
	},
	
	configureMessageDisplay : function (messageText) {
		// Calculate message display dimensions, position, and presentation.
		var mdW = 430;
		var mdH = 100;
		var mdL = Z.viewerW - mdW - 80;
		var mdT = Z.viewerH - mdH - 80;
		var scrnColor = this.getResource("DEFAULT_MESSAGESCREENCOLOR");
		var btnColor = this.getResource("DEFAULT_MESSAGEBUTTONCOLOR");

		// Create message display.
		Z.MessageDisplay = this.createContainerElement("div", "MessageDisplay", "inline-block", "absolute", "hidden", mdW + "px", mdH + "px", mdL + "px", mdT + "px", "solid", "1px", scrnColor, "0px", "0px", "normal");
		Z.ViewerDisplay.appendChild(Z.MessageDisplay);

		var messageBox = Z.Utils.createTextElement("messageBox", messageText, (mdW - 18) + "px", (mdH - 40) + "px", "4px", "4px", "4px", "solid", "1px", "auto", true, "verdana", "12px", "none");
		Z.MessageDisplay.appendChild(messageBox);
		Z.messages = document.getElementById("messageBox");
			
		// Configure and add display buttons.
		var btnW = 56;
		var btnH = 18;
		var dvdrW = 10;
		var dvdrH = 5;
		var btnL = mdW;
		var btnT = mdH - btnH - dvdrH;
		var btnTxt;
		
		// DEV NOTE: Cancel option not required by current feature set.
		/* btnL -= (btnW + dvdrW);
		btnTxt = this.getResource("DEFAULT_MESSAGECANCELBUTTONTEXT");
		var buttonCancel = new Z.Utils.Button("buttonCancel", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", this.messageCancelButtonHandler, "TIP_MESSAGECANCEL", "solid", "1px", btnColor, "0px", "0px");
		Z.MessageDisplay.appendChild(buttonCancel.elmt);	
		*/

		btnL -= (btnW + dvdrW);
		btnTxt = this.getResource("DEFAULT_MESSAGEOKBUTTONTEXT");
		var buttonOk = new Z.Utils.Button("buttonOk", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", this.messageOkButtonHandler, "TIP_MESSAGEOK", "solid", "1px", btnColor, "0px", "0px");
		Z.MessageDisplay.appendChild(buttonOk.elmt);	
	},

	messageOkButtonHandler : function (event) {
		Z.Utils.hideMessage();
		return true;
	},

	messageCancelButtonHandler : function (event) {
		// DEV NOTE: Cancel option not required by current feature set.
		Z.Utils.hideMessage();
		return false;
	},

	showTraces : function () {
		// Debug option: Displays cummulative list of trace values.
		if (!Z.TraceDisplay) {
			Z.Utils.configureTraceDisplay();
		} else {
			Z.TraceDisplay.style.display = "inline-block";
		}
	},
	
	hideTraces : function () {
		Z.TraceDisplay.style.display = "none";
	},

	configureTraceDisplay : function () {
		var tdW = Z.viewerW / 3;
		var tdH = Z.viewerH / 3 + 45;
		var tdL = 10;
		var tdT = Z.viewerH / 3;
		var scrnColor = this.getResource("DEFAULT_TRACEDISPLAYSCREENCOLOR");

		Z.TraceDisplay = this.createContainerElement("div", "TraceDisplay", "inline-block", "absolute", "hidden", tdW + "px", tdH+ "px", tdL + "px", tdT + "px", "solid", "1px", scrnColor, "0px", "10px", "normal");
		Z.ViewerDisplay.appendChild(Z.TraceDisplay);

		var placeHolderTraceText = "Trace Values" + "\n"; 
		var tracesBox = Z.Utils.createTextElement("debugTraces", placeHolderTraceText, (tdW - 15) + "px", (tdH - 60) + "px", "10px", "10px", "5px", "solid", "1px", "auto", true, "verdana", "10px", "none");
		Z.TraceDisplay.appendChild(tracesBox);
		Z.traces = document.getElementById("debugTraces");
		
		var btnW = 58;
		var btnH = 42;
		var btnL = 20;
		var btnT = tdH - (btnH / 2) - 10;
		var btnSpan = 10;
		var btnColor = this.getResource("DEFAULT_TRACEDISPLAYBUTTONCOLOR");

		var btnTxt = this.getResource("DEFAULT_TRACEDISPLAYSHOWGLOBALSBUTTONTEXT");
		var buttonShowGlobals = new this.Button("buttonShowGlobals", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", this.showGlobals, "TIP_SHOWGLOBALS", "solid", "1px", btnColor, "0px", "0px");
		Z.TraceDisplay.appendChild(buttonShowGlobals.elmt);

		btnL += btnW + btnSpan;
		var btnTxt = this.getResource("DEFAULT_TRACEDISPLAYTOGGLEDISPLAYBUTTONTEXT");
		var buttonToggleDisplay = new this.Button("buttonToggleDisplay", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", Z.Viewport.toggleDisplay, "TIP_TOGGLEDISPLAY", "solid", "1px", btnColor, "0px", "0px");
		Z.TraceDisplay.appendChild(buttonToggleDisplay.elmt);

		btnL += btnW + btnSpan;
		var btnTxt = this.getResource("DEFAULT_TRACEDISPLAYTOGGLEBACKFILLBUTTONTEXT");
		var buttonToggleBackfill = new this.Button("buttonToggleBackfill", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", Z.Viewport.toggleBackfill, "TIP_TOGGLEBACKFILL", "solid", "1px", btnColor, "0px", "0px");
		Z.TraceDisplay.appendChild(buttonToggleBackfill.elmt);

		btnL += btnW + btnSpan;
		btnW += 12;
		var btnTxt = this.getResource("DEFAULT_TRACEDISPLAYTOGGLECONSTRAINPANBUTTONTEXT");
		var buttonToggleConstrainPan = new this.Button("buttonToggleConstrainPan", btnTxt, null, null, null, null, btnW + "px", btnH + "px", btnL + "px", btnT + "px", "mousedown", Z.Viewport.toggleConstrainPan, "TIP_TOGGLECONSTRAINPAN", "solid", "1px", btnColor, "0px", "0px");
		Z.TraceDisplay.appendChild(buttonToggleConstrainPan.elmt);
	},

	trace : function (text) {
		if (!Z.TraceDisplay) { Z.Utils.configureTraceDisplay(); }
		if (Z.traces) { Z.traces.value += "\n" + text + "\n"; }
	},

	drawCenterLines : function (display, w, h) {
		var viewportCenterLineVertical = Z.Utils.createContainerElement("div", "viewportCenterLineVertical", "inline-block", "absolute", "visible", "1px", h + "px", (w / 2) + "px", "0px", "solid", "1px", "transparent none", "0px", "0px", "normal");
		var viewportCenterLineHorizontal = Z.Utils.createContainerElement("div", "viewportCenterLineHorizontal", "inline-block", "absolute", "visible", w + "px", "1px", "0px", (h / 2) + "px", "solid", "1px", "transparent none", "0px", "0px", "normal");
		display.appendChild(viewportCenterLineHorizontal);
		display.appendChild(viewportCenterLineVertical);
	}
};




