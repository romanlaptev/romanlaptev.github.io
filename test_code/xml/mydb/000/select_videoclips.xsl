<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
<html>
<meta charset="utf-8"/>
<title> my video </title>
<head>
<style>
div
{
	/*border:1px solid black;*/
}

#div_main
{
	margin-left:30px;
	margin-right:30px;
	/*width:80%;*/
}

#title
{
	margin-top:50px;
	text-align:center;
}

.image
{
	/*float:none;*/
}

span img   
{
    display: block;
    margin: auto;
    padding: 10px;
}

span
{
	text-align:center;
	width:100%;
	display:block;
}

.producer
{
	background:palegreen;
	margin:10px;
	padding:20px;
}

.roles
{
	background:#D0CCA5;
	color:#000000;
	margin:10px;
	padding:20px;
}

.description
{
	background:#D0CCD5;
	color:#000000;
	margin:10px;
	padding:20px;
}

i   
{
    font-weight: bold;
}

</style>
</head>
<body>

<div id="div_main">
<!-- вывести секции -->
<xsl:for-each select="document('mydb.xml')/main/video/videoclips/videoclip">
		<div id="title">
			<b><xsl:number/>. </b>
			<a href="{./location/a/@href}" target="_blank"><h2><xsl:value-of select="@group"/></h2><h2><xsl:value-of select="@title"/></h2></a>
			<i><xsl:value-of select="./genre"/></i>
		</div>

		<div>
		<xsl:for-each select="child::*">
			<xsl:if test="name(.)='img'">
				<span><img src="{./@src}" width="400"/></span>
			</xsl:if>
			<xsl:if test="name(.)='description'">
				<div class="description">
				<i>Описание:</i><xsl:value-of select="." />
				</div>
			</xsl:if>
			<xsl:if test="name(.)='filesize'">
				<span><xsl:value-of select="." /></span>
			</xsl:if>

			<xsl:if test="name(.)='location'">
				<b>Ссылка для локальной сети: </b><br/>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{./@href}" target="{./@target}"><xsl:value-of select="."/></a><br/></xsl:if>
				</xsl:for-each>
			</xsl:if>
			<xsl:if test="name(.)='filesharing'">
				<b>Ссылка для скачивания с файлообменников: </b><br/>
				<xsl:for-each select="child::*">
					<xsl:if test="name(.)='a'"><a href="{./@href}" target="{./@target}"><xsl:value-of select="."/></a><br/></xsl:if>
				</xsl:for-each>
			</xsl:if>

		</xsl:for-each>
		</div>
</xsl:for-each>
</div>

</body>
</html>

</xsl:template>
</xsl:stylesheet>

