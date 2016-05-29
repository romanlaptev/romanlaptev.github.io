<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<head>
	<meta charset="utf-8"/>
	<title>Albums</title>
<script>
//document.write("999999999999999999999");
//document.write ("<input type='text' value='" + getenv("tid") +"'/>");

//var tid = document.getElementById("tid");
//tid.innerHTML="<h2>Hello!</h2>";

//alert (getenv("tid"));
//alert (tid.text);

function processnode(nnodeid)
{
//alert (nnodeid);
 if (document.getElementById(nnodeid).style.display == "none")
   {
    document.getElementById(nnodeid).style.display = ""
   }
 else
   {
    document.getElementById(nnodeid).style.display = "none"
   }
}

function getenv(i)
 {
  if (!i.length) 
    { return false; }  
  qStr = document.location.href;
  strpos = qStr.indexOf("?"+i+"=");

  if ( strpos ==-1) 
    { strpos = qStr.indexOf("&amp;"+i+"="); }

  if ( strpos == qStr.length || strpos ==-1 )
    { return false; }

  val = qStr.substring( (strpos+i.length)+2, qStr.length);

  strpos = val.indexOf("&amp;");

  if ( strpos !=-1 ) 
    { val = val.substring(0, strpos ); }

  if ( !val.length ) 
    { return false; }
  else { return val; }

}

</script>
<noscript>
      <b> not javascript support </b>
</noscript>

	<style>
.main
{
	width:700px;
	margin:auto;
	text-align:center;
	border:1px solid;
}
.album,
.termin
{
	float:left;
	width:100px;
	height:100px;
	border:1px solid;
	margin:20px;
	padding:5px;
	text-align:center;
}
.list_pictures
{
	position:absolute;
	top:30px;
	left:30px;
	width:700px;
	border:1px solid;
	background:#ffffff;
}
.picture
{
	float:left;
	/*width:300px;*/
	min-height:300px;
	margin:10px;
}
.field_title_value
{
	width:300px;
	margin:10px;
}
.content
{
}
.close
{
	float:right;
	margin:10px;
}
	</style>
</head>
<body>

<div class="main">
	<h2>Мастера графики</h2>
<script>
getenv("tid");
</script>

<!--<xsl:variable name="url_content" select="'http://mycomp'"/>-->
<xsl:variable name="url_content" select="'http://albums.vhost.16mb.com'"/>

<xsl:for-each select="document('export.xml')/albums/taxonomy_vocabulary/termin">
		
	<xsl:if test="@tid_parent='0'">
	<div class="termin">
		<!-- <b><xsl:number/>. </b> -->
			<!-- <h3><xsl:value-of select="@tid_parent"/></h3> -->
			<xsl:variable name="tid" select="@tid"/>
			<xsl:for-each select="child::*">
				<xsl:if test="name(.)='term_name'">
				<div class="album_title">
					<a href="view_album.xml?tid={$tid}"><xsl:value-of select="." /></a>
				</div>
				</xsl:if>
			</xsl:for-each>
		</div>
	</xsl:if>
		
</xsl:for-each>

	<div style="clear:both"></div>
	<h2>Wizard graphics</h2>
	</div> <!-- end main -->
</body>
</html>

</xsl:template>
</xsl:stylesheet>

